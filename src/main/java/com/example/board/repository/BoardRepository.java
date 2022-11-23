package com.example.board.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.board.entity.Fboard;


public interface BoardRepository extends JpaRepository<Fboard, Integer> {

}
