---
title: "Spinrg Boot アプリのJUnit5テストパターン"
layout: post
date: 2022-02-22T08:30:15+0900
categories: blogs
tags: ["SpinrgBoot", "JUnit5"]
---

## Junit5とは

JUnitとは、Java言語で開発されたプログラムの単体テスト（ユニットテスト）を行なうためのソフトウェア。v5は現時点の最新バージョンです。

## Spring Boot Test

SpringBootアプリケーションの統合テストのサポート。

### [Test Scope Dependencies](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.testing.test-scope-dependencies)

- [JUnit 5](https://junit.org/junit5/): Javaアプリケーションのユニットテストのデファクトスタンダード。
- [Spring Test & Spring Boot Test](https://docs.spring.io/spring-framework/docs/5.3.15/reference/html/testing.html#integration-testing): SpringBootアプリケーションのユーティリティと統合テストのサポート。
- [AssertJ](https://assertj.github.io/doc/): フルーエントなアサーションライブラリ。
- [Hamcrest](https://github.com/hamcrest/JavaHamcrest): マッチャーオブジェクトのライブラリ（制約または述語とも呼ばれます）。
- [Mockito](https://site.mockito.org/): Javaモックフレームワーク。
- [JSONassert](https://github.com/skyscreamer/JSONassert): JSON用のアサーションライブラリ。
- [JsonPath](https://github.com/jayway/JsonPath): JSONのXPath。

## テストプロジェクト

### テスト環境情報

| アプリ      | Version |
| :---------- | :------ |
| java        | 17      |
| gradle      | 7.4     |
| Spring Boot | 2.6.3   |

### テストプロジェクト

> テストパターンのテストソースは下記のgit repositoryにプッシュしました。

https://github.com/gekal-study-spring/spring-boot-junit5

## テストパターン

### Controllerのテスト

#### テスト対象

<details><summary>ExampleController.java</summary>

**`ExampleController.java`**

```java
/**
 * サンプルAPI
 */
@RestController
@RequestMapping("/test")
public class ExampleController {

    /** テストサービス */
    private final TestService testService;

    /**
     * コンストラクタ
     *
     * @param testService テストサービス
     */
    public ExampleController(TestService testService) {
        this.testService = testService;
    }

    /**
     * POSTのサンプルAPI
     *
     * @param sampleRequest サンプルリクエスト
     * @return サンプルレスポンス
     */
    @PostMapping("/")
    public SampleResponse samplePostApi(@RequestBody SampleRequest sampleRequest) {

        SampleInput sampleInput = new SampleInput();
        sampleInput.setValue1(sampleRequest.getValue1());
        sampleInput.setValue2(sampleRequest.getValue2());

        SampleOutput sampleOutput = this.testService.testService(sampleInput);

        SampleResponse sampleResponse = new SampleResponse();
        sampleResponse.setResult1(sampleOutput.getResult1());
        sampleResponse.setResult2(sampleOutput.getResult2());

        return sampleResponse;
    }

}
```

</details>

#### Junitサンプル

<details><summary>ExampleControllerTests.java</summary>

**`ExampleControllerTests.java`**

```java
/**
 * サンプルAPIのJunit
 */
@WebMvcTest(controllers = ExampleController.class, properties = {"logging.level.cn.gekal.sample.junit.controller.ExampleController=DEBUG"})
class ExampleControllerTests {

    /** MockMvc */
    @Autowired
    private MockMvc mockMvc;

    /** サンプルインプット */
    @Captor
    private ArgumentCaptor<SampleInput> testServiceInput;

    /** サンプルAPI */
    @Autowired
    private ExampleController target;

    /** テストサービス */
    @MockBean
    private TestService testService;

    /** ObjectMapper */
    @Autowired
    private ObjectMapper objectMapper;

    @DisplayName("POSTのサンプルAPI - 正常")
    @Test
    public void samplePostApi() throws Exception {

        // モック
        SampleOutput sampleOutput = new SampleOutput();
        sampleOutput.setResult1("11111");
        sampleOutput.setResult2("22222");
        when(testService.testService(any())).thenReturn(sampleOutput);

        // データ準備
        SampleRequest sampleRequest = new SampleRequest();
        sampleRequest.setValue1("value1");
        sampleRequest.setValue2("value2");

        String content = objectMapper.writeValueAsString(sampleRequest);

        // テスト実施
        RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/test/")
                .contentType(MediaType.APPLICATION_JSON)
                .content(content);
        mockMvc.perform(requestBuilder)
                .andDo(print()) // リクエスト詳細
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result1").value("11111"))
                .andExpect(jsonPath("$.result2").value("22222"));

        // 検証：モックパラメータ
        assertAll(() -> {
            verify(testService, times(1)).testService(testServiceInput.capture());
            assertThat(testServiceInput.getValue()).usingRecursiveComparison().isEqualTo(sampleRequest);
        });
    }
}
```

</details>

### Serviceのテスト

Springコンテンツの初期化が不要なため、Mockitoを使っってテストします。
Springのコンテンツが必要な場合、SpringBootTestの@Autowiredと@MockBeanを使ってください。

#### テスト対象

<details><summary>TestService.java</summary>

**`TestService.java`**

```java
/**
 * テストサービス
 */
@Service
public class TestService {

    /** テストリポジトリ */
    private final TestRepository testRepository;

    /**
     * コンストラクタ
     *
     * @param testRepository テストリポジトリ
     */
    public TestService(TestRepository testRepository) {
        this.testRepository = testRepository;
    }

    /**
     * テストメソッド
     *
     * @param sampleInput インプット
     * @return アウトプット
     */
    public SampleOutput testService(SampleInput sampleInput) {

        return this.testRepository.testRepository(sampleInput);
    }

}
```

</details>

#### Junitサンプル

<details><summary>TestServiceTests.java</summary>

**`TestServiceTests.java`**

```java
/**
 * テストサービスのJunit
 */
class TestServiceTests {

    /** サンプルインプット */
    @Captor
    private ArgumentCaptor<SampleInput> testRepositoryInput;

    /** テストサービス */
    @InjectMocks
    private TestService target;

    /** テストリポジトリ */
    @Mock
    private TestRepository testRepository;

    @BeforeEach
    void init() {
        MockitoAnnotations.openMocks(this);
    }

    @DisplayName("テストメソッド")
    @Test
    void testService() {

        // モック
        SampleOutput sampleOutput = new SampleOutput();
        sampleOutput.setResult1("aaaaa");
        sampleOutput.setResult2("bbbbb");
        when(testRepository.testRepository(any())).thenReturn(sampleOutput);

        // データ準備
        SampleInput sampleInput = new SampleInput();
        sampleInput.setValue1("11111");
        sampleInput.setValue2("22222");

        // テスト実施
        SampleOutput testRepositoryOutput = target.testService(sampleInput);

        // 検証: レスポンス
        assertThat(testRepositoryOutput).usingRecursiveComparison().isEqualTo(sampleOutput);

        // 検証：モックパラメータ
        assertAll(() -> {
            verify(testRepository, times(1)).testRepository(testRepositoryInput.capture());
            assertThat(testRepositoryInput.getValue()).usingRecursiveComparison().isEqualTo(sampleInput);
        });
    }
}
```

</details>

### RestTemplateのリポジトリのテスト

#### テスト対象

<details><summary>SamplePostRequestRepository.java</summary>

**`SamplePostRequestRepository.java`**

```java
/**
 * テストリポジトリ
 */
@Repository
public class SamplePostRequestRepository {

    /** LOGGER */
    private static final Logger LOGGER = LoggerFactory.getLogger(SamplePostRequestRepository.class);

    /** サンプルレストテンプレート */
    private final RestTemplate sampleRestTemplate;

    /** HttpBinメソッドのプロパティー */
    private final HttpBinMethodProperties httpBinMethodProperties;

    /**
     * コンストラクタ
     *
     * @param sampleRestTemplate      サンプルレストテンプレート
     * @param httpBinMethodProperties HttpBinメソッドのプロパティー
     */
    public SamplePostRequestRepository(RestTemplate sampleRestTemplate, HttpBinMethodProperties httpBinMethodProperties) {
        this.sampleRestTemplate = sampleRestTemplate;
        this.httpBinMethodProperties = httpBinMethodProperties;
    }

    /**
     * テストメソッド
     *
     * @param httpBinPostInput インプット
     * @return アウトプット
     */
    public HttpBinPostOutput httpBinPost(HttpBinPostInput httpBinPostInput) {

        LOGGER.debug("HttpBinPostInput = [{}]", httpBinPostInput);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<HttpBinPostInput> httpEntity = new HttpEntity<>(httpBinPostInput, headers);

        ResponseEntity<HttpBinPostOutput>
                responseEntity =
                this.sampleRestTemplate.exchange(httpBinMethodProperties.getPost(),
                        HttpMethod.POST,
                        httpEntity,
                        HttpBinPostOutput.class);

        HttpBinPostOutput httpBinPostOutput = responseEntity.getBody();

        LOGGER.debug("StatusCode = [{}]", responseEntity.getStatusCode());
        LOGGER.debug("HttpBinPostOutput = [{}]", httpBinPostOutput);

        return httpBinPostOutput;
    }
}
```

</details>

#### Junitサンプル

<details><summary>SamplePostRequestRepositoryTests.java</summary>

**`SamplePostRequestRepositoryTests.java`**

```java
/**
 * テストリポジトリのJunit
 */
@RestClientTest(value = {SamplePostRequestRepository.class, RestTemplateConfiguration.class, SampleRestTemplateProperties.class, HttpBinMethodProperties.class}, properties = {"http-bin.method.post=https://httpbin.org/post", "logging.level.cn.gekal.sample.junit.repository.SamplePostRequestRepository=DEBUG"})
class SamplePostRequestRepositoryTests {

    /** テストのPOST先 */
    private static final String POST = "https://httpbin.org/post";

    /** テストリポジトリ */
    @Autowired
    private SamplePostRequestRepository samplePostRequestRepository;

    /** モックサーバー */
    @Autowired
    private MockRestServiceServer server;

    /** JSONマッパー */
    @Autowired
    private ObjectMapper objectMapper;

    @DisplayName("テストメソッド")
    @Test
    void httpBinPost() throws JsonProcessingException {

        // モック
        HttpBinPostInput httpBinPostInput = new HttpBinPostInput();
        httpBinPostInput.setValue1("Value1");
        httpBinPostInput.setValue2("Value2");

        HttpBinPostOutput httpBinPostOutputMock = new HttpBinPostOutput();
        httpBinPostOutputMock.setArgs(Maps.newHashMap("key1", "value1"));
        httpBinPostOutputMock.setData("Data");
        httpBinPostOutputMock.setFiles("Files");
        httpBinPostOutputMock.setForm("Form");
        httpBinPostOutputMock.setHeaders("Headers");
        httpBinPostOutputMock.setJson("Json");
        httpBinPostOutputMock.setOrigin("Origin");
        httpBinPostOutputMock.setUrl("Url");

        this.server.expect(once(), requestTo(POST))
                .andExpect(method(HttpMethod.POST))
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json(objectMapper.writeValueAsString(httpBinPostInput)))
                .andRespond(withSuccess(objectMapper.writeValueAsString(httpBinPostOutputMock),
                        MediaType.APPLICATION_JSON));

        // テスト実施
        HttpBinPostOutput result = samplePostRequestRepository.httpBinPost(httpBinPostInput);

        // 結果検証
        assertThat(result).usingRecursiveComparison().isEqualTo(httpBinPostOutputMock);
    }

}
```

</details>

### ログの出力検証

#### ログ検証用ユーティリティー

<details><summary>LoggerHelper.java</summary>

**`LoggerHelper.java`**

```java
/**
 * ロガーヘルパー
 */
public class LoggerHelper {

    /** LOGGER */
    private static final Logger LOGGER = LoggerFactory.getLogger(LoggerHelper.class);

    /**
     * 対象クラスのアベンダーを追加する
     *
     * @param clazz 対象クラス
     * @return アベンダー
     */
    public static Appender<ILoggingEvent> addAppender(Class<?> clazz) {

        @SuppressWarnings("unchecked") Appender<ILoggingEvent> mockAppender = mock(Appender.class);
        var logger = LoggerFactory.getLogger(clazz);
        if (logger instanceof ch.qos.logback.classic.Logger logbackLogger) {
            logbackLogger.addAppender(mockAppender);
        }

        return mockAppender;
    }

    /**
     * ログのレベルとメッセージを検証する
     *
     * @param mockAppender アベンダー
     * @param levels       ログレベルリスト
     * @param messages     メッセージリスト
     */
    public static void verifyLog(Appender<ILoggingEvent> mockAppender, @NonNull List<Level> levels, @NonNull List<String> messages) {

        // ログレベル数とメッセージ数が一致するか検証する
        assertEquals(levels.size(), messages.size());

        // イベントをキャプチャする
        ArgumentCaptor<ILoggingEvent> eventCaptor = ArgumentCaptor.forClass(ILoggingEvent.class);
        verify(mockAppender, times(messages.size())).doAppend(eventCaptor.capture());

        // ログ出力内容を検証する
        List<ILoggingEvent> loggingEvents = eventCaptor.getAllValues();
        for (int i = 0; i < loggingEvents.size(); i++) {
            ILoggingEvent loggingEvent = loggingEvents.get(i);

            LOGGER.info("actual: LoggerName = [{}], Level = [{}], message = [{}]",
                    loggingEvent.getLoggerName(),
                    loggingEvent.getLevel(),
                    loggingEvent.getFormattedMessage());

            assertEquals(levels.get(i), loggingEvent.getLevel());
            assertEquals(messages.get(i), loggingEvent.getFormattedMessage());
        }
    }
}
```

</details>

#### テスト対象

<details><summary>SamplePostRequestService.java</summary>

**`SamplePostRequestService.java`**

```java
/**
 * テストサービス
 */
@Repository
public class SamplePostRequestService {

    /** LOGGER */
    private static final Logger LOGGER = LoggerFactory.getLogger(SamplePostRequestService.class);

    /** サンプルレストテンプレート */
    private final SamplePostRequestRepository samplePostRequestRepository;

    /**
     * コンストラクタ
     *
     * @param samplePostRequestRepository サンプルレストテンプレート
     */
    public SamplePostRequestService(SamplePostRequestRepository samplePostRequestRepository) {
        this.samplePostRequestRepository = samplePostRequestRepository;
    }

    /**
     * テストメソッド
     *
     * @param httpBinPostInput インプット
     * @return アウトプット
     */
    public HttpBinPostOutput httpBinPost(HttpBinPostInput httpBinPostInput) {

        LOGGER.debug("テストログ");

        return samplePostRequestRepository.httpBinPost(httpBinPostInput);
    }
}

```

</details>

#### Junitサンプル

<details><summary>SamplePostRequestServiceTests.java</summary>

**`SamplePostRequestServiceTests.java`**

```java
/**
 * テストサービスのJunit
 */
class SamplePostRequestServiceTests {

    /** mockAppender */
    private Appender<ILoggingEvent> mockAppender;

    /** サンプルインプット */
    @Captor
    private ArgumentCaptor<HttpBinPostInput> testRepositoryInput;

    /** テストサービス */
    @InjectMocks
    private SamplePostRequestService samplePostRequestService;

    /** サンプルレストテンプレート */
    @Mock
    private SamplePostRequestRepository samplePostRequestRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockAppender = LoggerHelper.addAppender(SamplePostRequestService.class);
    }

    @DisplayName("テストメソッド")
    @Test
    void httpBinPost() {

        // モック
        HttpBinPostOutput httpBinPostOutputMock = new HttpBinPostOutput();
        httpBinPostOutputMock.setArgs(Maps.newHashMap("key1", "value1"));
        httpBinPostOutputMock.setData("Data");
        httpBinPostOutputMock.setFiles("Files");
        httpBinPostOutputMock.setForm("Form");
        httpBinPostOutputMock.setHeaders("Headers");
        httpBinPostOutputMock.setJson("Json");
        httpBinPostOutputMock.setOrigin("Origin");
        httpBinPostOutputMock.setUrl("Url");
        when(samplePostRequestRepository.httpBinPost(any())).thenReturn(httpBinPostOutputMock);

        // データ準備
        HttpBinPostInput httpBinPostInput = new HttpBinPostInput();
        httpBinPostInput.setValue1("11111");
        httpBinPostInput.setValue2("22222");

        // テスト実施
        HttpBinPostOutput httpBinPostOutput = samplePostRequestService.httpBinPost(httpBinPostInput);

        // 検証: レスポンス
        assertThat(httpBinPostOutput).usingRecursiveComparison().isEqualTo(httpBinPostOutputMock);

        // 検証：モックパラメータ
        assertAll(() -> {
            verify(samplePostRequestRepository, times(1)).httpBinPost(testRepositoryInput.capture());
            assertThat(testRepositoryInput.getValue()).usingRecursiveComparison().isEqualTo(httpBinPostInput);
        });

        // 検証：ログ
        LoggerHelper.verifyLog(mockAppender, List.of(Level.DEBUG), List.of("テストログ"));
    }
}
```

</details>

## 参照

1. [Spring Framework Documentation](https://docs.spring.io/spring-framework/docs/current/reference/html/index.html)
