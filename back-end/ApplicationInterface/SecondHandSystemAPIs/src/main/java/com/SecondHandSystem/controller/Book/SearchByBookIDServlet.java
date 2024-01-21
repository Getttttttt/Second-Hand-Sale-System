package com.SecondHandSystem.controller.Book;

import com.SecondHandSystem.dao.IBookDAO;
import com.SecondHandSystem.dao.IMerchantDAO;
import com.SecondHandSystem.factory.DAOFactory;
import com.SecondHandSystem.vo.Book;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/books/searchByBookID")
public class SearchByBookIDServlet extends HttpServlet {
    private void setAccessControlHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:9000"); // 允许的来源，根据需要更改
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Credentials", "true");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        setAccessControlHeaders(response);
        String bookID= request.getParameter("bookID");
        IMerchantDAO merchantDAOProxy;
        try {
            IBookDAO bookDAOProxy = DAOFactory.getIBookDAOInstance();
            System.out.println(32);
            Book book = bookDAOProxy.select(bookID);
            JSONObject jsonObject = new JSONObject();
            System.out.println(16);
            jsonObject.put("bookID", book.getBookID());
            System.out.println(8);
            merchantDAOProxy=DAOFactory.getIMerchantDAOInstance();
            String merchantID = merchantDAOProxy.searchMerchantID(bookID);
            System.out.println(merchantID);
            jsonObject.put("merchantID", merchantID);
            jsonObject.put("bookName", book.getBookName());
            jsonObject.put("bookPrice", book.getBookPrice());
            jsonObject.put("bookDiscount", book.getDiscount());
            jsonObject.put("bookNum", book.getBookNum());
            jsonObject.put("bookSurfacePic", book.getBookSurfacePic());
            jsonObject.put("bookAuthor", book.getAuthor());
            jsonObject.put("bookISBN", book.getBookISBN());
            jsonObject.put("bookPublisher", book.getBookPublisher());

            jsonObject.put("bookPublishTime", book.getPublicationTime());
            jsonObject.put("bookdegree", book.getDegree());
            jsonObject.put("bookLabels", new JSONArray(book.getBookLabels()));
            jsonObject.put("bookImages", new JSONArray(book.getBookRealPics()));
            jsonObject.put("bookShelfTime", book.getShelfTime());
            // 设置响应内容类型和编码
            System.out.println(jsonObject);
            String jsonString =jsonObject.toString();
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");

            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write(jsonString);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        setAccessControlHeaders(response);
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
