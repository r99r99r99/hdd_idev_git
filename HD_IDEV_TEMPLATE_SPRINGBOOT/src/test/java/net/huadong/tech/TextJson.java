package net.huadong.tech;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class TextJson {
	
	public static void main(String[] args) {
		List<User> usList = new ArrayList<>();
		usList.add(new User("哈哈哈","sdf","电饭锅电饭锅","施工方刚"));
		usList.add(new User("哈哈哈","sdf","电饭锅电饭锅","施工方刚"));
		usList.add(new User("哈哈哈","sdf","电饭锅电饭锅","施工方刚"));
		usList.add(new User("哈哈哈","sdf","电饭锅电饭锅","施工方刚"));
		usList.add(new User("哈哈哈","sdf","电饭锅电饭锅","施工方刚"));
		ObjectMapper mapper = new ObjectMapper();
		try {
			String string = mapper.writeValueAsString(usList);
			System.out.println("---"+string);
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
}
