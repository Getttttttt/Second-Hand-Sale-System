package com.SecondHandSystem.controller.BookBucket;

import com.SecondHandSystem.dao.IBookDAO;
import com.SecondHandSystem.dao.ICustomerDAO;
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

@WebServlet("/BookBacket/booklist")
public class GetBookBucketServlet extends HttpServlet {
    private void setAccessControlHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:9000"); // 允许的来源，根据需要更改
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Credentials", "true");
    }


    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        setAccessControlHeaders(response);
        // 获取用户ID参数
        String customerID = request.getParameter("customerID");
        System.out.println(customerID);
        ICustomerDAO customerDAOProxy;
        IBookDAO bookDAOProxy;
        IMerchantDAO merchantDAOProxy;
        try{
            customerDAOProxy= DAOFactory.getICustomerDAOInstance();
            String[][] buckets = customerDAOProxy.searchBookBucket(customerID);
            JSONArray jsonArray = new JSONArray();
            for(int i=0;i<buckets.length;i++){
                if(buckets[i][0]!=null){
                    JSONObject jsonObject = new JSONObject();
                    jsonObject.put("bookID", buckets[i][0]);
                    jsonObject.put("bookNum",Integer.parseInt(buckets[i][1]));
                    String bookID=buckets[i][0];
                    System.out.println(bookID);
                    bookDAOProxy=DAOFactory.getIBookDAOInstance();
                    Book book = bookDAOProxy.select(bookID);
                    jsonObject.put("bookAuthor", book.getAuthor());
                    jsonObject.put("bookISBN", book.getBookISBN());
                    jsonObject.put("bookName", book.getBookName());
                    jsonObject.put("bookSurfacePic", book.getBookSurfacePic());
                    jsonObject.put("bookPrice", book.getBookPrice()*(1-book.getDiscount()));
                    jsonObject.put("bookdegree", book.getDegree());
                    merchantDAOProxy=DAOFactory.getIMerchantDAOInstance();
                    String merchantID = merchantDAOProxy.searchMerchantID(bookID);
                    System.out.println(merchantID);
                    jsonObject.put("merchantID", merchantID);

                    // 将JSON对象添加到JSON数组中
                    System.out.println(jsonObject.toString());
                    jsonArray.put(jsonObject);

                } else{
                    break;
                }
            }
            System.out.println(jsonArray);
            // 将JSON数组转换为字符串
            String jsonString = jsonArray.toString();
            System.out.println(jsonString);


            // 设置响应内容类型和编码
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
