package com.example.board;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.example.board.entity.Fboard;
import com.example.board.repository.BoardRepository;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class BoardApplicationTests {

	@Autowired
	BoardRepository boardRepository;
	
	@Test
	void contextLoads() {
		PageRequest pageRequest = PageRequest.of(0,2);// 1번인자 : 현재페이지 0번째 페이지 / 2번인자 : 하나의 페이지 로우수
		Page<Fboard> pages = boardRepository.findAll(pageRequest);
		List<Fboard> boards = pages.getContent();
		for(Fboard board : boards) {
			System.out.println(board);
		}
	}

}
