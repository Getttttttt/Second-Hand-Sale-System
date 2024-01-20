package com.SecondHandSystem.controller.order;

import com.SecondHandSystem.dao.IEvaluationDAO;
import com.SecondHandSystem.factory.DAOFactory;
import com.SecondHandSystem.vo.Order;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/evaluationInsert")
public class SubmitEvaluationServlet extends HttpServlet {
    private void setAccessControlHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:9000"); // 允许的来源，根据需要更改
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Credentials", "true");
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        setAccessControlHeaders(response); // 设置跨域访问控制头部

        // 从请求参数中获取评价数据
        String orderID = request.getParameter("orderID");
        int rating = Integer.parseInt(request.getParameter("rating"));
        String evaluation = request.getParameter("evaluation");

        try {
            IEvaluationDAO EvaluationDAOProxy = DAOFactory.getIEvaluationDAOInstance();
            Order order = new Order();
            order.setOrderID(orderID);
            order.setEstimationScale(rating);
            order.setEvaluation(evaluation);
            boolean result = EvaluationDAOProxy.insert(order);
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
