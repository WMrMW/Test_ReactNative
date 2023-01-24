/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import model.User;

/**
 *
 * @author Márcio
 */
public class UserDAO {

    private final Connection conexao;

    public UserDAO(Connection conexao) {
        this.conexao = conexao;
    }

    public void insert(User usuario) throws SQLException {
        String sql = "insert into user(nome,email,senha,data_nasc,altura,peso,imc) values(?,?,?,?,?,?,?)";
        PreparedStatement preparedStatement = conexao.prepareStatement(sql);
        preparedStatement.setString(1, usuario.getNome());
        preparedStatement.setString(2, usuario.getEmail());
        preparedStatement.setString(3, usuario.getSenha());
        preparedStatement.setString(4, usuario.getData_Nasc());
        preparedStatement.setFloat(5, usuario.getAltura());
        preparedStatement.setFloat(6, usuario.getPeso());
        preparedStatement.setFloat(7, usuario.getImc());
        preparedStatement.execute();
    }

    public User verificaExistenciaPorEmaileSenha(User usuario) throws SQLException {
        String sql = "select * from user where email = ? and senha = ?";
        PreparedStatement preparedStatement = conexao.prepareStatement(sql);
        preparedStatement.setString(1, usuario.getEmail());
        preparedStatement.setString(2, usuario.getSenha());
        preparedStatement.execute();
        ResultSet resultSet = preparedStatement.getResultSet();
        if (resultSet.next()) {
            return new User(resultSet.getInt("id"), resultSet.getString("nome"), resultSet.getString("email"), resultSet.getString("senha"), resultSet.getString("data_nasc"), resultSet.getFloat("altura"), resultSet.getFloat("peso"), resultSet.getFloat("imc"));
        }
        return null;
    }

    public void updatePeso(User usuario) throws SQLException {
        String sql = "update user set peso = ?, imc = ? where id = ?";
        PreparedStatement preparedStatement = conexao.prepareStatement(sql);
        preparedStatement.setFloat(1, usuario.getPeso());
        preparedStatement.setFloat(2, usuario.getImc());
        preparedStatement.setInt(3, usuario.getId());
        preparedStatement.execute();
    }

    public void deleteUser(User usuario) throws SQLException {
        String sql = "delete from user where id = ?";
        PreparedStatement preparedStatement = conexao.prepareStatement(sql);
        preparedStatement.setInt(1, usuario.getId());
        preparedStatement.execute();
    }

    public ArrayList<User> selectAllUsers() throws SQLException {
        String sql = "select * from user";
        PreparedStatement preparedStatement = conexao.prepareStatement(sql);
        
        ArrayList<User> usuarios = new ArrayList<>();
        preparedStatement.execute();
        ResultSet resultSet = preparedStatement.getResultSet();
        if(resultSet.next()){
            
        }

    }

    public void updateAltura(User usuario) throws SQLException {
        String sql = "update user set altura = ?, imc = ? where id = ?";
        PreparedStatement preparedStatement = conexao.prepareStatement(sql);
        preparedStatement.setFloat(1, usuario.getAltura());
        preparedStatement.setFloat(2, usuario.getImc());
        preparedStatement.setInt(3, usuario.getId());
        preparedStatement.execute();
    }
}
