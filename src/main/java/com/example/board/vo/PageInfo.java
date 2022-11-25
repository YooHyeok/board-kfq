package com.example.board.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class PageInfo {
	private Integer allPage;
	private Integer curPage;
	private Integer startPage;
	private Integer endPage;
	
}
