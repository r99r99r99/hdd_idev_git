package net.huadong.tech.demo.test;

import com.alibaba.fastjson.JSONObject;
import net.huadong.tech.base.bean.HdQuery;
import net.huadong.tech.util.HdJunitTest;

import org.apache.http.HttpEntity;
import org.apache.http.client.CookieStore;
import org.apache.http.client.HttpClient;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.DefaultConnectionKeepAliveStrategy;
import org.apache.http.impl.client.DefaultRedirectStrategy;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.junit.Test;

import static org.junit.Assert.fail;

import java.util.HashMap;

public class DataSourceTest {
	String url1 = "http://localhost:8080/data/find/1";
	String url2 = "http://localhost:8080/data/find/2";

	@Test
	public void findUserIdByRoleAndOrg() {
		HdQuery hq = new HdQuery();
		hq.setPage(1);
		hq.setRows(10);
		HashMap m = new HashMap<>();
		m.put("query", "查询条件");
		hq.setQuery(m);
		String content1 = post(url1, JSONObject.toJSONString(hq));
		System.out.println("第一个数据源查询结果" + content1);
		String content2 = post(url2, JSONObject.toJSONString(hq));
		System.out.println("第二一个数据源查询结果" + content2);
	}

	public String post(String url, String jsonStr) {
		HttpClientContext context = HttpClientContext.create();
		CloseableHttpClient httpClient = HttpClientBuilder.create().setKeepAliveStrategy(new DefaultConnectionKeepAliveStrategy())
				.setRedirectStrategy(new DefaultRedirectStrategy()).build();

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
