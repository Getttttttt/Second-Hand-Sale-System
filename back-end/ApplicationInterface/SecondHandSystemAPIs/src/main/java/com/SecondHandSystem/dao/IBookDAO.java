package com.SecondHandSystem.dao;

import com.SecondHandSystem.vo.Book;

import java.util.ArrayList;
import java.util.List;

public interface IBookDAO {
    public boolean insert(Book book) throws Exception; //添加商品
    public Book select(String bookID) throws Exception; // 查询单个商品
    public ArrayList<Book> searchSpecificBooks(String searchContent) throws Exception;
    public boolean update(Book book) throws Exception;//修改商品
    public boolean delete(String bookID) throws Exception;//删除商品
    public ArrayList<Book> selectAll(String[] bookIDs) throws Exception;//查询指定商品
}
