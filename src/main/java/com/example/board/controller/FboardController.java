package com.example.board.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.board.entity.Fboard;
import com.example.board.service.BoardService;
import com.example.board.vo.PageInfo;

@RestController
public class FboardController {

	@Autowired
	BoardService boardService;
	
	@PostMapping("/writeboard")
	public ResponseEntity<String> writeboard(String writer, String password, String subject, String content, @RequestParam(name="file",required=false) MultipartFile file) {
		ResponseEntity<String> res = null;
		try {
			String filename = null;
			if(file != null && !file.isEmpty()) { //file이 비어있지 않으면 파일업로드작업 실행
				String path = "C:/yjh/upload/";
				filename = file.getOriginalFilename();
				File dFile = new File(path+filename);
				file.transferTo(dFile);
			}
			boardService.writeBoard(new Fboard(null, writer, password, subject, content, filename));
			res = new ResponseEntity<>("게시글 저장 성공", HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			res = new ResponseEntity<>("게시글 저장 실패", HttpStatus.BAD_REQUEST);
		}
		return res;
	}
	
	@PostMapping("/writeboard2")
	public ResponseEntity<String> writeboard2(@ModelAttribute Fboard board, @RequestParam(name="file", required = false) MultipartFile file) { //required = false는 갖고오지 않아도 상관없음
		ResponseEntity<String> res = null;
		try {
			boardService.writeBoard2(board, file);
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
			e.printStackTrace();
		}
	}
	
	@GetMapping("/boardlist")
	public ResponseEntity<List<Fboard>> boardList() {
		ResponseEntity<List<Fboard>> res = null;
			try {
				List<Fboard> boardList = boardService.boardList();
				res = new ResponseEntity<List<Fboard>>(boardList, HttpStatus.OK);
			} catch (Exception e) {
				res = new ResponseEntity<List<Fboard>>(HttpStatus.BAD_REQUEST);
			}
		return res;
	}
	
	@PutMapping("/modify/{id}")
	public ResponseEntity<String> modify(@PathVariable("id") Integer id, @RequestBody Fboard board) {
		System.out.println("modify");
		System.out.println(id);
		System.out.println(board);
		ResponseEntity<String> res = null;
		try {
			boardService.modifyBoard(id, board);
			res = new ResponseEntity<String>("게시판 수정 성공", HttpStatus.OK) ;
		} catch (Exception e) {
			res = new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
		}
		return res;
	}
	
	@GetMapping(value = {"/boardpage/{page}", "/boardpage"})
	public ResponseEntity<Map<String, Object>> boardPage(@PathVariable(required = false) Integer page) { //required false = 가져오지 않아도 된다.
		if (page == null) page=1;
		ResponseEntity<Map<String, Object>> res = null;
		try {
			
			PageInfo pageInfo = new PageInfo();
			pageInfo.setCurPage(page);
			
			List<Fboard> boards = boardService.boardPage(pageInfo);
			System.out.println(boards);
			Map<String,Object> map = new HashMap<String,Object>();
			map.put("pageInfo", pageInfo);
			map.put("boards", boards);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
			res = new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK) ;
			
		} catch (Exception e) {
			res = new ResponseEntity<Map<String, Object>>(HttpStatus.BAD_REQUEST);
		}
		return res;
	}
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Integer> delete(@PathVariable Integer id, @RequestBody Map<String, String> data) {
		String password = data.get("password");
		ResponseEntity<Integer> res = null;
		try {
			Integer messageNo = boardService.delete(id, password);
			res = new ResponseEntity<Integer>(messageNo, HttpStatus.OK);
		} catch (Exception e) {
			res = new ResponseEntity<Integer>(HttpStatus.BAD_REQUEST);
		}
		return res;
	}
	
	@PutMapping("/delete/{id}")
	public ResponseEntity<Integer> delete2(@PathVariable Integer id, String password) {
		
		ResponseEntity<Integer> res = null;
		try {
			Integer messageNo = boardService.delete(id, password);
			res = new ResponseEntity<Integer>(messageNo, HttpStatus.OK);
		} catch (Exception e) {
			res = new ResponseEntity<Integer>(HttpStatus.BAD_REQUEST);
		}
		return res;
	}
}
