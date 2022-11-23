package com.example.board.service;

import java.io.File;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.board.entity.Fboard;
import com.example.board.repository.BoardRepository;

@Service
public class BoardService {

	@Autowired
	BoardRepository boardRepository;
	
	public void writeBoard(Fboard board) {
		boardRepository.save(board);
	}

	public void writeBoard2(Fboard board) throws Exception {
		MultipartFile file = board.getFile();
		String filename = null;
		if(file != null && !file.isEmpty()) {
			String path = "C:/yjh/upload/";
			filename = file.getOriginalFilename();
			File dFile = new File(path+filename); // 경로에 있는 파일로 파일 객체를 만든다.
			file.transferTo(dFile); //파일 객체를 바이너리 데이터 변환 멀티 파트 파일로 복사
			board.setFilename(filename);
		}
		boardRepository.save(board);
		
	}

	public Fboard detailBoard(Integer id) throws Exception {
		Optional<Fboard> oboard= boardRepository.findById(id);
		if(oboard.isPresent()) return oboard.get();
		throw new Exception("글번호 오류");
	}
}
