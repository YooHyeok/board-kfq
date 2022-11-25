package com.example.board.service;

import java.io.File;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.board.entity.Fboard;
import com.example.board.repository.BoardRepository;
import com.example.board.vo.PageInfo;

@Service
public class BoardService {

	@Autowired
	BoardRepository boardRepository;
	
	public void writeBoard(Fboard board) {
		boardRepository.save(board);
	}

	public void writeBoard2(Fboard board, MultipartFile file) throws Exception {
		String filename = null;
		if(file != null && !file.isEmpty()) {
			String path = "C:/yjh/upload/";
			filename = file.getOriginalFilename();
			File dFile = new File(path+filename); // 경로에 있는 파일로 파일 객체를 만든다.
			file.transferTo(dFile); //파일 객체를 바이너리 데이터 변환 멀티 파트 파일로 복사
		}
		board.setFilename(filename);
		
		boardRepository.save(board);
		
	}

	public Fboard detailBoard(Integer id) throws Exception {
		Optional<Fboard> oboard= boardRepository.findById(id);
		if(oboard.isPresent()) return oboard.get();
		throw new Exception("글번호 오류");
	}

	public List<Fboard> boardList() {
		List<Fboard> boardList= boardRepository.findAll(Sort.by(Sort.Direction.DESC,"id"));
		
		return boardList;
	}

	public void modifyBoard(Integer id, Fboard board) throws Exception {
		Optional<Fboard> oboard= boardRepository.findById(id);
		if(oboard.isEmpty()) throw new Exception("글조회오류");
		boardRepository.save(board);
	}

	public List<Fboard> boardPage(PageInfo pageInfo) {
		PageRequest pageRequest = PageRequest.of(pageInfo.getCurPage()-1
								, 5
								, Sort.by(Sort.Direction.DESC,"id"));
		Page<Fboard> pages = boardRepository.findAll(pageRequest);
		int maxPage = pages.getTotalPages();
		int startPage = pageInfo.getCurPage()/10*10+1; //1, 11, 21, 31, ... , 71
		int endPage = startPage+10-1; //10, 20, 30, 40, ... , 80
		if(endPage>maxPage) endPage = maxPage;
		pageInfo.setAllPage(maxPage);
		pageInfo.setStartPage(startPage);
		pageInfo.setEndPage(endPage);
		
		return pages.getContent();
	}
	
	public Integer delete(Integer id, String password) throws Exception{
		Optional<Fboard> oboard = boardRepository.findById(id);
		if(oboard.isEmpty()) return -1;
		Fboard board = oboard.get();
//		if(board.getPassword().equals(password) == false) return -2;
		//null은 .equals로 비교할수없다 nullPointerException발생 안넘어감. 아래와같이 수정
		if(password!=null  && password.equals(board.getPassword()) == false) return -2;
		boardRepository.deleteById(id);
		return 0;
	}
}
