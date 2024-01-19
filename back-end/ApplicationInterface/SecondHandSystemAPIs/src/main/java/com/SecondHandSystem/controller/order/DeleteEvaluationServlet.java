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

@WebServlet("/deleteEvaluation")
public class DeleteEvaluationServlet extends HttpServlet {
    private void setAccessControlHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:9000"); // 允许的来源，根据需要更改
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Credentials", "true");
    }
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        setAccessControlHeaders(response);
        String orderID = request.getParameter("orderID");
        IEvaluationDAO EvaluationDAOProxy = null;
        try {
            EvaluationDAOProxy = DAOFactory.getIEvaluationDAOInstance();
            boolean result = EvaluationDAOProxy.delete(orderID);
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
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        setAccessControlHeaders(response);
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
