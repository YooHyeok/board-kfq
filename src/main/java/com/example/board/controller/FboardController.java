package com.example.board.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.OutputStream;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.board.entity.Fboard;
import com.example.board.service.BoardService;

@RestController
public class FboardController {

	@Autowired
	BoardService boardService;
	
	@PostMapping("/writeboard")
	public ResponseEntity<String> writeboard(String writer, String password, String subject, String content, @RequestParam(name="file",required=false) MultipartFile file) {
		ResponseEntity<String> res = null;
		System.out.println("writer : "+writer);
		try {
			String filename = null;
			if(file != null && !file.isEmpty()) { //file이 비어있지 않으면 파일업로드작업 실행
				String path = "C:/yjh/upload/";
				filename = file.getOriginalFilename();
				File dFile = new File(path+filename);
				file.transferTo(dFile);
			}
			boardService.writeBoard(new Fboard(null, writer, password, subject, content, filename, null));
			res = new ResponseEntity<>("게시글 저장 성공", HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			res = new ResponseEntity<>("게시글 저장 실패", HttpStatus.BAD_REQUEST);
		}
		return res;
	}
	
	@PostMapping("/writeboard2")
	public ResponseEntity<String> writeboard2(@ModelAttribute Fboard board) {
		ResponseEntity<String> res = null;
		try {
			boardService.writeBoard2(board);
			res = new ResponseEntity<String> ("게시글 저장 성공",HttpStatus.OK);
		} catch(Exception e) {
			e.printStackTrace();
			res = new ResponseEntity<String> ("게시글 저장 실패",HttpStatus.BAD_REQUEST);
		}
		return res;
	}
	
	@GetMapping("/boarddetail/{id}")
	public ResponseEntity<Fboard> boardDetail(@PathVariable Integer id) {
		ResponseEntity<Fboard> res = null;
		try {
			Fboard board = boardService.detailBoard(id);
			System.out.println(board);
			res = new ResponseEntity<Fboard> (board,HttpStatus.OK);
		} catch (Exception e) {
			res = new ResponseEntity<Fboard> (HttpStatus.OK);
		}
		return res;
	}
	@GetMapping("/img/{filename}")
	public void imageView(@PathVariable String filename, HttpServletResponse response) {
		try {
			String path = "C:/yjh/upload/";
			FileInputStream fis = new FileInputStream(path+filename);
			OutputStream out = response.getOutputStream(); // 응답에 대한 데이터를 내려보내줄 스트림
			FileCopyUtils.copy(fis, out);
			out.flush();
		} catch (Exception e) {
		}
	}
}
