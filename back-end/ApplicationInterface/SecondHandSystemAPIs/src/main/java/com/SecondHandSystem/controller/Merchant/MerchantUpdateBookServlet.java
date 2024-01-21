package com.SecondHandSystem.controller.Merchant;

import com.SecondHandSystem.dao.IBookDAO;
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
import java.text.SimpleDateFormat;
import java.util.Date;

@WebServlet("/merchant/updateBook")
public class MerchantUpdateBookServlet extends HttpServlet {
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

        //传入的merchantId,bookId,bookName,price,discount,quantity,condition,timeOnShelf,bookImage,writer,ISBN,publisher,publishTime
        String merchantId = jsonObject.optString("merchantId");
        String bookId = jsonObject.optString("bookId");
        String bookName = jsonObject.optString("bookName");
        System.out.println(bookName);
        double price = Double.parseDouble(jsonObject.optString("price"));
        double discount = Double.parseDouble(jsonObject.optString("discount"));
        int quantity = Integer.parseInt(jsonObject.optString("quantity"));
        String condition = jsonObject.optString("condition");
        String timeOnShelf = jsonObject.optString("timeOnShelf");
        System.out.println(timeOnShelf);
        String bookImage = jsonObject.optString("bookImage");
        String bookShow1 = jsonObject.optString("bookShow1");
        String bookShow2 = jsonObject.optString("bookShow2");
        String bookShow3 = jsonObject.optString("bookShow3");
        String[] bookRealPics = {bookImage,bookShow1,bookShow2,bookShow3};

        //转换Date
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date onShelf = null;
        try {
            onShelf = dateFormat.parse(timeOnShelf);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        System.out.println(onShelf);


        String rsSale = null;
        boolean  rsBook = false;
        String result = null;
        try {
            System.out.println(merchantId);
            System.out.println(bookId);
            IBookDAO bookDAO1 = DAOFactory.getIBookDAOInstance();
            //创建Book实例
            Book book = new Book();
            book = bookDAO1.select(bookId);
            book.setBookName(bookName);
            book.setBookPrice(price);
            book.setDiscount(discount);
            book.setBookNum(quantity);
            book.setBookSurfacePic(bookImage);
            book.setDegree(condition);
            book.setShelfTime(onShelf);
            book.setBookRealPics(bookRealPics);

            System.out.println("book");
            System.out.println(book.getBookNum());

            IBookDAO bookDAO2 = DAOFactory.getIBookDAOInstance();
            rsBook = bookDAO2.update(book);
            IMerchantDAO merchantDAO = DAOFactory.getIMerchantDAOInstance();
            rsSale = merchantDAO.updateBookOnsale(merchantId,bookId,quantity,onShelf,condition);

            System.out.println(quantity);
            if(rsSale=="Success!" && rsBook){
                result = "Success!";
            }
            else{
                result = "Fail!";
            }
        } catch (Exception e){
            System.out.println("catch");
            e.printStackTrace();
        }


        String[][] bookList = new String[300][5];
        String[][] bookInformation = new String[300][9];


        int i = 0;
        try {
            IMerchantDAO merchantDAO = DAOFactory.getIMerchantDAOInstance();
            bookList = merchantDAO.searchBookOnsale(merchantId);
            for (String[] book : bookList) {
                if (book[0] != null) {
                    IBookDAO bookDAO = DAOFactory.getIBookDAOInstance();
                    bookId = book[0];
                    quantity = Integer.parseInt(book[2]);
                    timeOnShelf = book[3];
                    condition = book[4];
                    Book b = new Book();
                    b = bookDAO.select(book[0]);
                    bookName = b.getBookName();
                    price = b.getBookPrice();
                    discount = b.getDiscount();
                    bookImage = b.getBookSurfacePic();
                    bookInformation[i][0] = bookId;
                    bookInformation[i][1] = bookName;
                    bookInformation[i][2] = String.valueOf(price);
                    bookInformation[i][3] = String.valueOf(discount);
                    bookInformation[i][4] = String.valueOf(quantity);
                    bookInformation[i][5] = condition;
                    System.out.println(condition);
                    bookInformation[i][6] = timeOnShelf;
                    bookInformation[i][7] = bookImage;
                    bookInformation[i][8] = merchantId;
                    i++;
                }
            }

        } catch (Exception e) {
            System.out.println("catch");
            e.printStackTrace();
            throw new RuntimeException(e);
        }

        try {
            JSONArray jsonArray = new JSONArray();
            int j = 0;
            for (String[] bi : bookInformation) {
                if (bi[0] != null && j < i) {
                    JSONObject json = new JSONObject();
                    json.put("bookId", bi[0].trim());
                    json.put("bookName", bi[1].trim());
                    json.put("price", bi[2].trim());
                    json.put("discount", bi[3].trim());
                    json.put("quantity", bi[4].trim());
                    json.put("condition", bi[5].trim());
                    json.put("timeOnShelf", bi[6].trim());
                    json.put("bookImage", bi[7].trim());
                    json.put("merchantId", bi[8].trim());
                    jsonArray.put(json);
                    j++;
                } else {
                    break;
                }
            }
            System.out.println("out the for block");
            // 将JSON数组转换为字符串
            String jsonString = jsonArray.toString();
            System.out.println(jsonString);

            // 设置响应类型和状态
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write(jsonString);


        } catch (JSONException e) {
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
