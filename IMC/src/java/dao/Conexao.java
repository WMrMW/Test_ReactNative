
package dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;


public class Conexao {
    
    public Connection getConexao() throws SQLException{
       Connection conexao = DriverManager.getConnection("jdbc:mysql://localhost:3306/test_imc","root","root");
       return conexao;
    }
}
