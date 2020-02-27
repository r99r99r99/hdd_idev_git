package net.huadong.tech.privilege.service.impl;

import java.util.List;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import net.huadong.tech.privilege.service.AuthRoleService;
import net.huadong.tech.util.HdJunitTest;
import net.huadong.tech.util.PrivilegeUtils;

public class AuthRoleServiceImplTest extends HdJunitTest {
	@Autowired
	AuthRoleService authRoleService;

	@Test
	public void findUserIdByRoleAndOrg() {
		List ls=authRoleService.findUserIdByRoleAndOrg("普通管理员", "0", true);
		System.out.println(ls.size());
	}
	@Test
	public void findUserIdLs() {// 测试生成的序列号

		System.out.println(PrivilegeUtils.findUserIdLs("普通管理员", "0", true));
	}

}
