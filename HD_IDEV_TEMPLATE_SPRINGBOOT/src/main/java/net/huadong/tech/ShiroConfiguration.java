package net.huadong.tech;

import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.Filter;

import org.apache.shiro.authc.credential.Md5CredentialsMatcher;
import org.apache.shiro.cache.ehcache.EhCacheManager;
import org.apache.shiro.spring.LifecycleBeanPostProcessor;
import org.apache.shiro.spring.security.interceptor.AuthorizationAttributeSourceAdvisor;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.filter.authc.LogoutFilter;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;


import net.huadong.tech.privilege.filter.HdRealm;
import net.huadong.tech.privilege.filter.LoginFilter;

/**
 * 集成shiro。
 * @author jason
 *
 */
@Configuration
public class ShiroConfiguration {
	
	@Bean(name = "lifecycleBeanPostProcessor")
    public LifecycleBeanPostProcessor lifecycleBeanPostProcessor() {
        return new LifecycleBeanPostProcessor();
    }
	
	@Bean(name = "hashedCredentialsMatcher")
	public Md5CredentialsMatcher hashedCredentialsMatcher() {
		Md5CredentialsMatcher credentialsMatcher = new Md5CredentialsMatcher();
//		credentialsMatcher.setHashAlgorithmName("MD5");
//		credentialsMatcher.setHashIterations(2);
//		credentialsMatcher.setStoredCredentialsHexEncoded(true);
		return credentialsMatcher;
	}
	
	@Bean(name = "shiroRealm")
	@DependsOn("lifecycleBeanPostProcessor")
    public HdRealm shiroRealm() {
		HdRealm realm = new HdRealm();
		realm.setCredentialsMatcher(hashedCredentialsMatcher());
        return realm;
    }
	
	@Bean(name = "ehCacheManager")
	@DependsOn("lifecycleBeanPostProcessor")
	public EhCacheManager ehCacheManager(){
		EhCacheManager ehCacheManager = new EhCacheManager();
		return ehCacheManager;
	}
	
	@Bean(name = "securityManager")
	public DefaultWebSecurityManager securityManager(){
		DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
		securityManager.setRealm(shiroRealm());
		securityManager.setCacheManager(ehCacheManager());
		return securityManager;
	}

	@Bean(name = "shiroFilter")
	public ShiroFilterFactoryBean shiroFilterFactoryBean(){
		ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();
		shiroFilterFactoryBean.setSecurityManager(securityManager());
		
		Map<String, Filter> filters = new LinkedHashMap<String, Filter>();
		LogoutFilter logoutFilter = new LogoutFilter();
		logoutFilter.setRedirectUrl("/login");
		filters.put("logout", logoutFilter);
		filters.put("login", new LoginFilter());
		shiroFilterFactoryBean.setFilters(filters);
		
		Map<String, String> filterChainDefinitionManager = new LinkedHashMap<String, String>();
		filterChainDefinitionManager.put("/logout", "logout");
		
		filterChainDefinitionManager.put("/login/**", "login");
		filterChainDefinitionManager.put("/webresources/login/**","login");
		filterChainDefinitionManager.put("/main", "login");
//		filterChainDefinitionManager.put("/user/**", "authc,roles[user]");
//		filterChainDefinitionManager.put("/shop/**", "authc,roles[shop]");
//		filterChainDefinitionManager.put("/admin/**", "authc,roles[admin]");
		filterChainDefinitionManager.put("/**", "anon");
		shiroFilterFactoryBean.setFilterChainDefinitionMap(filterChainDefinitionManager);
		
		shiroFilterFactoryBean.setLoginUrl("/index.html");
		shiroFilterFactoryBean.setSuccessUrl("/login");
		shiroFilterFactoryBean.setUnauthorizedUrl("/403");
		
		return shiroFilterFactoryBean;
	}

//	@Bean
//	@ConditionalOnMissingBean
//    public DefaultAdvisorAutoProxyCreator defaultAdvisorAutoProxyCreator() {
//        DefaultAdvisorAutoProxyCreator daap = new DefaultAdvisorAutoProxyCreator();
//        daap.setProxyTargetClass(true);
//        return daap;
//    }
	
	@Bean
    public AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor() {
        AuthorizationAttributeSourceAdvisor aasa = new AuthorizationAttributeSourceAdvisor();
        aasa.setSecurityManager(securityManager());
        return aasa;
    }

}