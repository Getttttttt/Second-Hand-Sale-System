package com.SecondHandSystem.controller.Book;

import com.SecondHandSystem.dao.IBookDAO;
import com.SecondHandSystem.dao.IMerchantDAO;
import com.SecondHandSystem.dao.IOrderDAO;
import com.SecondHandSystem.factory.DAOFactory;
import com.SecondHandSystem.vo.Book;
import com.SecondHandSystem.vo.Order;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Instant;
import java.util.Date;
import java.util.Random;

@WebServlet("/books/payment")
public class PaymentByOneServlet extends HttpServlet {
    private void setAccessControlHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:9000"); // 允许的来源，根据需要更改
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Credentials", "true");
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        setAccessControlHeaders(response); // 设置跨域访问控制头部
        // 从请求参数中获取评价数据
        String customerID = request.getParameter("customerID");
        String bookID= request.getParameter("bookID");
        int num = Integer.parseInt(request.getParameter("num"));
        Order order = new Order();
        try {
            IBookDAO bookDAOProxy = DAOFactory.getIBookDAOInstance();
            System.out.println(32);
            Book book = bookDAOProxy.select(bookID);
            IMerchantDAO merchantDAOProxy = DAOFactory.getIMerchantDAOInstance();
            String merchantID = merchantDAOProxy.searchMerchantID(bookID);
            System.out.println(merchantID);
            order.setMerchantID(merchantID);
            long timestamp = Instant.now().toEpochMilli();
            order.setOrderID(String.valueOf(timestamp));
            order.setCustomerID(customerID);
            order.setTradingNum(num);
            order.setTradingTime(new Date());
            order.setBookPublishTime(book.getPublicationTime());
            order.setBookName(book.getBookName());
            order.setBookISBN(book.getBookISBN());
            order.setTradingPrice(book.getBookPrice()*(1-book.getDiscount()));
            order.setBookLabels(book.getBookLabels());
            order.setBookSurfacePic(book.getBookSurfacePic());
            order.setBookImages(book.getBookRealPics());
            Random random = new Random();
            int randomNumber = random.nextInt(2);
            order.setTradingStatus(randomNumber==0?"正在进行":"已完成");//假实现
            order.setEstimationScale(-1);
            order.setEvaluation(null);
            order.setBookdegree(book.getDegree());
            order.setEstimationScale(-1);
            order.setEvaluation(null);
            order.setBookPublisher(book.getBookPublisher());
            IOrderDAO orderDAOProxy = DAOFactory.getIOrderDAOInstance();
            boolean result = orderDAOProxy.insert(order);
            String jsonString;
            if(result==true){
                jsonString="success";
            }
            else{
                jsonString="fail";
            }
            System.out.println(result);
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
