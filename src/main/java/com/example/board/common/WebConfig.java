package com.example.board.common;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 
 * @author yjou7
 *
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

	/**
	 * Cors Mapping (Cross-Origin Resource Sharing,CORS) 란 다른 출처의 자원을 공유할 수 있도록 설정하는
	 * 권한 체제를 말합니다. 따라서 CORS를 설정해주지 않거나 제대로 설정하지 않은 경우, 원하는대로 리소스를 공유하지 못하게 됩니다.
	 * 
	 * @reference
	 * https://dev-pengun.tistory.com/entry/Spring-Boot-CORS-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0
	 * 
	 * @method 
	 * react서버 요청을 허용한다
	 * <pre>
	 *     addMapping : 모든 매핑을 추가한다.
	 * allowedOrigins : 브라우저에서 교차 출처 요청이 허용되는 출처를 설정
	 *       
	 * </pre>      
	 */
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**").allowedOrigins("http://localhost:3000"); //모든 매핑을
	}
	
}