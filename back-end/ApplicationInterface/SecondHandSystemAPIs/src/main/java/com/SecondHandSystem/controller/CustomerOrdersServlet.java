package com.SecondHandSystem.controller;

import com.SecondHandSystem.dao.IOrderDAO;
import com.SecondHandSystem.factory.DAOFactory;
import com.SecondHandSystem.vo.Order;
import org.json.JSONObject;
import org.json.JSONArray;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

@WebServlet("/customer/orderList")
public class CustomerOrdersServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // 获取用户ID参数
        String customerID = request.getParameter("customerID");
        try {
            IOrderDAO orderDAOProxy = DAOFactory.getIOrderDAOInstance();
            ArrayList<Order> orderList = orderDAOProxy.selectByCustomer(customerID);
            JSONArray jsonArray = new JSONArray();
            for (Order order : orderList) {
                // 创建JSON对象
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("MainData", order.getOrderID());
                jsonObject.put("bookID", order.getBookID());
                jsonObject.put("merchantNumber", order.getMerchantID());
                jsonObject.put("bookName", order.getBookName());
                jsonObject.put("orderPrice", order.getTradingPrice());
                jsonObject.put("orderNum", order.getTradingNum());
                jsonObject.put("orderStatus", order.getTradingStatus());
                jsonObject.put("orderTime", order.getTradingTime());
                jsonObject.put("bookSurfacePic", order.getBookSurfacePic());
                jsonObject.put("bookAuthor", order.getBookAuthor());
                jsonObject.put("bookISBN", order.getBookISBN());
                jsonObject.put("bookPublisher", order.getBookPublisher());
                jsonObject.put("bookPublishTime", order.getBookPublishTime());
                jsonObject.put("bookdegree", order.getBookdegree());
                jsonObject.put("bookLabels", new JSONArray(order.getBookLabels()));
                jsonObject.put("bookImages", new JSONArray(order.getBookImages()));
                jsonObject.put("estimationScale", order.getEstimationScale());
                jsonObject.put("evaluation", order.getEvaluation());
                // 将JSON对象添加到JSON数组中
                jsonArray.put(jsonObject);
            }
            // 将JSON数组转换为字符串
            String jsonString = jsonArray.toString();

            // 设置响应内容类型和编码
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");

            // 返回响应结果
            response.getWriter().write(jsonString);

        } catch (Exception e) {
            e.printStackTrace();
        }

    }

}
