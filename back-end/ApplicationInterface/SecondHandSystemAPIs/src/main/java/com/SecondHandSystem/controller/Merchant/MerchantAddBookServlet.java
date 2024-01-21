package com.SecondHandSystem.controller.Merchant;

import com.SecondHandSystem.dao.IBookDAO;
import com.SecondHandSystem.dao.ICommunicationDAO;
import com.SecondHandSystem.dao.IMerchantDAO;
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
import java.text.ParseException;
import java.time.Instant;
import java.util.Date;
import java.text.SimpleDateFormat;

@WebServlet("/merchant/addBook")
public class MerchantAddBookServlet extends HttpServlet {
    private void setAccessControlHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:9001"); // 允许的来源，根据需要更改
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

        //传入的merchantId,bookId,bookName,price,discount,quantity,condition,timeOnShelf,bookImage,writer,ISBN,publisher,publishTime,label
        String merchantId = jsonObject.optString("merchantId");
        String bookId = jsonObject.optString("bookId");
        String bookName = jsonObject.optString("bookName");
        System.out.println(bookName);
        double price = Double.parseDouble(jsonObject.optString("price"));
        double discount = Double.parseDouble(jsonObject.optString("discount"));
        int quantity = Integer.parseInt(jsonObject.optString("quantity"));
        String condition = jsonObject.optString("condition");
        String timeOnShelf = jsonObject.optString("timeOnShelf");
        String bookImage = jsonObject.optString("bookImage");
        String bookShow1 = jsonObject.optString("bookShow1");
        String bookShow2 = jsonObject.optString("bookShow2");
        String bookShow3 = jsonObject.optString("bookShow3");
        String[] bookRealPics = {bookImage,bookShow1,bookShow2,bookShow3};
        String writer = jsonObject.optString("writer");
        String ISBN =jsonObject.optString("ISBN");
        String publisher = jsonObject.optString("publisher");
        String publishTime = jsonObject.optString("publishTime");
        String[] label = new String[]{jsonObject.optString("bookLabel")};
        System.out.println(label[0]);
        System.out.println(label.length);
        String string = (label[0]).substring(2,label[0].length()-2);
        System.out.println(string);
        String[] bookLabel = new String[10];
        if(label.length==1){
            bookLabel[0] = string;
        }
        else {
            bookLabel = string.split("\",\"");
        }
        System.out.println(bookLabel[0]);


        //转换Date
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date onShelf = null;
        Date publish = null;
        try {
            onShelf = dateFormat.parse(timeOnShelf);
            publish = dateFormat.parse(publishTime);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        System.out.println(onShelf);

        //创建Book实例
        Book book = new Book();
        System.out.println(bookId);
        book.setBookID(bookId);
        book.setBookName(bookName);
        book.setBookPrice(price);
        book.setDiscount(discount);
        book.setBookNum(quantity);
        book.setAuthor(writer);
        book.setBookISBN(ISBN);
        book.setBookPublisher(publisher);
        book.setPublicationTime(publish);
        book.setBookSurfacePic(bookImage);
        book.setBookRealPics(bookRealPics);
        book.setDegree(condition);
        book.setShelfTime(onShelf);
        book.setBookLabels(bookLabel);
        System.out.println("book");
        System.out.println(book.getBookName());

        String rsSale = null;
        boolean  rsBook = false;
        String result = null;
        try {
            System.out.println(merchantId);
            System.out.println(bookId);
            IMerchantDAO merchantDAO = DAOFactory.getIMerchantDAOInstance();
            IBookDAO bookDAO = DAOFactory.getIBookDAOInstance();
            rsBook = bookDAO.insert(book);
            rsSale = merchantDAO.insertBookOnsale(merchantId,bookId,quantity,onShelf,condition);
            if(rsSale=="Success!" && rsBook){
                result = "Success!";
            }
            else{
                result = "Fail!";
            }
        } catch (Exception e){
            e.printStackTrace();
        }


        try{
            JSONArray jsonArray = new JSONArray();
            JSONObject json = new JSONObject();
            json.put("bookId", book.getBookID().trim());
            json.put("bookName", book.getBookName().trim());
            json.put("price", book.getBookPrice());
            json.put("discount", book.getDiscount());
            json.put("quantity", book.getBookNum());
            json.put("condition", book.getDegree());
            json.put("timeOnShelf", book.getShelfTime());
            json.put("bookImage", book.getBookSurfacePic().trim());
            json.put("merchantId", merchantId);
            jsonArray.put(json);

            String jsonString = jsonArray.toString();
            // 设置响应类型和状态
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write(jsonString);
        } catch (JSONException e){
            e.printStackTrace();
            throw new RuntimeException(e);
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
