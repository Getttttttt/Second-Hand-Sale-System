package com.SecondHandSystem.controller.order;

import com.SecondHandSystem.dao.IEvaluationDAO;
import com.SecondHandSystem.factory.DAOFactory;
import com.SecondHandSystem.vo.Order;
import org.json.JSONArray;
import org.json.JSONObject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/evaluationDetail")
public class GetEvaluationServlet extends HttpServlet {
    private void setAccessControlHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:9000"); // 允许的来源，根据需要更改
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Credentials", "true");
    }
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        setAccessControlHeaders(response);
        String orderID= request.getParameter("orderID");
        try {
            IEvaluationDAO EvaluationDAOProxy = DAOFactory.getIEvaluationDAOInstance();
            Order order = EvaluationDAOProxy.selectByOrder(orderID);
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("MainData", order.getOrderID());
            jsonObject.put("bookID", order.getBookID());
            jsonObject.put("customerID", order.getCustomerID());
            jsonObject.put("merchantNumber", order.getMerchantID());
            jsonObject.put("bookName", order.getBookName());
            jsonObject.put("bookSurfacePic", order.getBookSurfacePic());
            jsonObject.put("bookAuthor", order.getBookAuthor());
            jsonObject.put("bookISBN", order.getBookISBN());
            jsonObject.put("bookdegree", order.getBookdegree());
            jsonObject.put("estimationScale", order.getEstimationScale());
            jsonObject.put("evaluation", order.getEvaluation());
            String jsonString =jsonObject.toString();
            System.out.println(jsonString);
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
