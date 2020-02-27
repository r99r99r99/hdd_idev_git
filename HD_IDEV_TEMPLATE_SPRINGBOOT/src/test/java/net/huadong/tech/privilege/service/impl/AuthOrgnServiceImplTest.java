package net.huadong.tech.privilege.service.impl;

import static org.junit.Assert.fail;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import net.huadong.tech.privilege.service.AuthOrgnService;
import net.huadong.tech.util.HdJunitTest;

public class AuthOrgnServiceImplTest  extends HdJunitTest{
	@Autowired
	private AuthOrgnService authOrgnService;
	@Test
	public void testEzuiFind() {
		fail("Not yet implemented");
	}

	@Test
	public void testAuthOrgnGetHdClauses() {
		fail("Not yet implemented");
	}

	@Test
	public void testFindTree() {
		authOrgnService.findTree("2");
	}

	@Test
	public void testFind() {
		fail("Not yet implemented");
	}

	@Test
	public void testEzuiSave() {
		fail("Not yet implemented");
	}

}
