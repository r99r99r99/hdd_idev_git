package net.huadong.tech.util;

import java.io.IOException;

import org.apache.http.HttpEntity;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.CookieStore;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.DefaultConnectionKeepAliveStrategy;
import org.apache.http.impl.client.DefaultRedirectStrategy;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import net.huadong.tech.base.bean.HdRunTimeException;
import static org.junit.Assert.fail;

/**
 * 单元测试基础类
 * 
 * @author ： wangxiaoliang
 * @Date: 2017年8月2日
 */
@RunWith(SpringJUnit4ClassRunner.class)
// @SpringBootTest(classes = HdAGVApplication.class) // 指定spring-boot的启动类
// @EnableCaching(proxyTargetClass = true)
// @WebAppConfiguration
// @Transactional // 默认回滚
public class HdJunitTest {
	// @Autowired
	// private WebApplicationContext ctx;
	public static CloseableHttpClient httpClient;
	public static HttpClientContext context = null;
	public static CookieStore cookieStore = null;
	public static RequestConfig requestConfig = null;
	
	protected final static String testUrl = "http://localhost:8091";
	
	@BeforeClass
	public static void before() throws Exception {
		// SpringUtils.setApplicationContext(ctx);

		context = HttpClientContext.create();
		cookieStore = new BasicCookieStore();
		requestConfig = RequestConfig.custom().setConnectTimeout(120000).setSocketTimeout(60000).setConnectionRequestTimeout(60000).build();
		httpClient = HttpClientBuilder.create().setKeepAliveStrategy(new DefaultConnectionKeepAliveStrategy()).setRedirectStrategy(new DefaultRedirectStrategy()).setDefaultRequestConfig(requestConfig).setDefaultCookieStore(cookieStore).build();
		// 创建请求方法的实例， 并指定请求url
		HttpGet httpget = new HttpGet(testUrl + "/PrivilegeVueController/login?account=admin&password=ok123");
		// 获取http响应状态码
		CloseableHttpResponse response = httpClient.execute(httpget);
		HttpEntity entity = response.getEntity();
		// 接收响应头
		String content = EntityUtils.toString(entity, "utf-8");

		// 再做个登录
	}

	@Test
	public void findUserIdLs() {// 测试生成的序列号

		// mockMvc.perform(requestBuilder)
	}

	public String post(String url, String jsonStr) {

		HttpPost httpPost = new HttpPost(url);
		httpPost.addHeader("Content-Type", "application/json");
		if (jsonStr != null)
			httpPost.setEntity(new StringEntity(jsonStr, "utf-8"));
		CloseableHttpResponse response;
		try {
			response = httpClient.execute(httpPost, context);
			int statusLine = response.getStatusLine().getStatusCode();
			System.out.println("---------" + statusLine + "-----------");
			// 获取http响应状态码
			HttpEntity entity = response.getEntity();
			// 接收响应头
			String content = EntityUtils.toString(entity, "utf-8");
			return content;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		fail("ts error");
		return "ts error";
	}

}
