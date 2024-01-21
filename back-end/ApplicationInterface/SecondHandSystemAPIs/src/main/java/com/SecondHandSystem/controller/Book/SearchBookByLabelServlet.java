package com.SecondHandSystem.controller.Book;

import com.SecondHandSystem.dao.IBookDAO;
import com.SecondHandSystem.factory.DAOFactory;
import com.SecondHandSystem.vo.Book;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.ArrayList;

@WebServlet("/books/searchByLabel")
public class SearchBookByLabelServlet extends HttpServlet {
    private void setAccessControlHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:9000"); // 允许的来源，根据需要更改
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Credentials", "true");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        setAccessControlHeaders(response);

        // 处理请求数据
        StringBuilder requestBody = new StringBuilder();
        String line;
        try (BufferedReader reader = request.getReader()) {
            while ((line = reader.readLine()) != null) {
                requestBody.append(line).append('\n');
            }
        }

        // 打印接收到的数据
        System.out.println("Received data: " + requestBody.toString());

        String jsonData = requestBody.toString();
        System.out.println("Received data: " + jsonData);

        JSONObject jsonObject = null;
        try {
            jsonObject = new JSONObject(jsonData);
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }

        // analysis variable
        String searchContent = jsonObject.optString("searchLabel");

        String returnMessage;

        try {
            IBookDAO BookDAO = DAOFactory.getIBookDAOInstance();
            ArrayList<Book> books;
            books = BookDAO.searchSpecificBooks(searchContent);
            JSONArray jsonArray = new JSONArray();
            for (Book book : books) {
                // 创建JSON对象
                JSONObject jsonObjectSingleBook = new JSONObject();
                jsonObjectSingleBook.put("bookID", book.getBookID());
                jsonObjectSingleBook.put("bookPrice", book.getBookPrice());
                jsonObjectSingleBook.put("bookNumber", book.getBookNum());
                jsonObjectSingleBook.put("bookName", book.getBookName());
                jsonObjectSingleBook.put("bookLabels", new JSONArray(book.getBookLabels()));
                jsonObjectSingleBook.put("bookISBN", book.getBookISBN());
                jsonObjectSingleBook.put("bookPublisher", book.getBookPublisher());
                jsonObjectSingleBook.put("bookRealPics", book.getBookRealPics());
                jsonObjectSingleBook.put("bookSurfacePic", book.getBookSurfacePic());
                jsonObjectSingleBook.put("bookAuthor", book.getAuthor());
                jsonObjectSingleBook.put("bookPublisher", book.getBookPublisher());
                jsonObjectSingleBook.put("bookDiscount", book.getDiscount());
                jsonObjectSingleBook.put("bookDegree", book.getDegree());
                jsonObjectSingleBook.put("bookPublicationTime", book.getPublicationTime());
                jsonObjectSingleBook.put("bookShelfTime", book.getShelfTime());
                // 将JSON对象添加到JSON数组中
                jsonArray.put(jsonObjectSingleBook);
            }
            if (books.size() != 0)
                returnMessage = "Search Successful";
            else
                returnMessage = "Error";
            String jsonString = jsonArray.toString();

            System.out.println(jsonString);

            // 设置响应类型和状态
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.setStatus(HttpServletResponse.SC_OK);
            JSONObject json = new JSONObject();
            response.getWriter().write(jsonString);

        } catch (Exception e) {
            returnMessage = "Search failure: "+e.toString();
        }
    }


    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        setAccessControlHeaders(response);

        // 设置响应类型和状态
        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().write("Hello World");
    }

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        setAccessControlHeaders(response);
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
