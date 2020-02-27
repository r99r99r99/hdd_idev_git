package net.huadong.tech.util;

import org.junit.Test;

import net.huadong.tech.privilege.entity.AuthUser;

public class CommonUtilTest extends HdJunitTest {

	@Test
	public void test() {// 测试生成的序列号

		System.out.println(HdUtils.genSysNo(AuthUser.class));
	}
	
}
