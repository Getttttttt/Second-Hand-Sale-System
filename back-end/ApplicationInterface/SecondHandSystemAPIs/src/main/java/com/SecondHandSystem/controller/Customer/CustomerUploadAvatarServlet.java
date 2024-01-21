package com.SecondHandSystem.controller.Customer;


import com.SecondHandSystem.dao.ICustomerDAO;
import com.SecondHandSystem.dao.IMerchantDAO;
import com.SecondHandSystem.factory.DAOFactory;
import com.SecondHandSystem.vo.Customer;
import com.SecondHandSystem.vo.Merchant;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.UUID;

@WebServlet("/customer/uploadAvatar")
@MultipartConfig
public class CustomerUploadAvatarServlet extends HttpServlet {
    private void setAccessControlHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:9001"); // 允许的来源，根据需要更改
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Credentials", "true");
    }


    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");
        try {
            // 从请求中获取文件部分
            Part filePart = request.getPart("avatar");
            String customerId = request.getParameter("customerId");
            String nickname = request.getParameter("nickname");
            String password = request.getParameter("password");
            String telephone = request.getParameter("telephone");
            String address = request.getParameter("address");

            // 生成一个唯一的文件名
            String fileName = UUID.randomUUID().toString() + "_" + getFileName(filePart);

            // 将文件保存到服务器
            saveFile(filePart, fileName);

            ICustomerDAO customerDAO = DAOFactory.getICustomerDAOInstance();
            Customer customer = new Customer();
            // 将文件信息保存到数据库
            boolean rs = saveFileInfoToDB(customerDAO, fileName, customerId,nickname,password,telephone,address);
            JSONObject json = new JSONObject();
            if(rs){
                json.put("result","Upload successful!");
                json.put("url","/"+fileName);
            }
            else{
                json.put("result","Upload failed!");
                json.put("url","/"+fileName);
            }
            // 将JSON对象转换为字符串
            String jsonString = json.toString();
            System.out.println(jsonString);
            response.getWriter().write(jsonString);

        } catch (Exception e) {
            e.printStackTrace();
            response.getWriter().write("Upload failed!");
        }

    }


    private void saveFile(Part part, String fileName) throws IOException {
        // 获取输入流
        try (InputStream input = part.getInputStream()) {
            // 在此处将输入流保存到服务器上的文件
            // 这里只是一个简单的示例，实际情况请根据你的服务器配置进行实现
            // 例如，可以使用文件系统或云存储服务保存文件
            // 这里使用相对路径保存到项目根目录的 images 文件夹下
            String filePath = getServletContext().getRealPath("/image/") + fileName;
            try (OutputStream output = new java.io.FileOutputStream(filePath)) {
                byte[] buffer = new byte[1024];
                for (int length = 0; (length = input.read(buffer)) > 0;) {
                    output.write(buffer, 0, length);
                }
            }
        }
    }

    private String getFileName(final Part part) {
        for (String content : part.getHeader("content-disposition").split(";")) {
            if (content.trim().startsWith("filename")) {
                return content.substring(content.indexOf('=') + 1).trim().replace("\"", "");
            }
        }
        return null;
    }

    private boolean saveFileInfoToDB(ICustomerDAO customerDAO, String fileName, String customerId,String nickname,String password,String telephone,String address) throws Exception {
        // 在此处将文件信息保存到数据库
        // 这里只是一个简单的示例，请根据你的数据库表结构进行实现
        String rs = customerDAO.updateCustomer(customerId,nickname,password,telephone,address,"/image/"+fileName);
        if(rs=="Update Successful")
            return true;
        else
            return false;
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
