package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import model.Peso;
import model.User;

public class PesoDAO {

    private final Connection conexao;

    public PesoDAO(Connection conexao) {
        this.conexao = conexao;
    }

    public void insert(Peso peso) throws SQLException {
        UserDAO userDAO = new UserDAO(conexao);
        User usuario = userDAO.getUserPorId(peso.getUser_id());
        usuario.setPeso(peso.getValor());
        float new_imc = peso.getValor() / (usuario.getAltura() * usuario.getAltura());
        usuario.setImc(new_imc);
        userDAO.updatePeso(usuario);

        String sql = "insert into peso(valor,user_id) values(?,?)";
        PreparedStatement preparedStatement = conexao.prepareStatement(sql);
        preparedStatement.setFloat(1, peso.getValor());
        preparedStatement.setInt(2, peso.getUser_id());
        preparedStatement.execute();
    }

    public void insertSemAtualizarUser(Peso peso) throws SQLException {
        String sql = "insert into peso(valor,user_id) values(?,?)";
        PreparedStatement preparedStatement = conexao.prepareStatement(sql);
        preparedStatement.setFloat(1, peso.getValor());
        preparedStatement.setInt(2, peso.getUser_id());
        preparedStatement.execute();
    }

    public void delete(Peso peso) throws SQLException {
        String sql = "delete from peso where id = ?";
        PreparedStatement preparedStatement = conexao.prepareStatement(sql);
        preparedStatement.setInt(1, peso.getId());
        preparedStatement.execute();
    }

    public ArrayList<Peso> selectAllPesos() throws SQLException {
        String sql = "select * from peso";
        PreparedStatement preparedStatement = conexao.prepareStatement(sql);

        ArrayList<Peso> pesos = new ArrayList<>();
        preparedStatement.execute();
        ResultSet resultSet = preparedStatement.getResultSet();
        while (resultSet.next()) {
            pesos.add(new Peso(resultSet.getInt("id"),resultSet.getFloat("valor"), resultSet.getInt("user_id")));
        }
        return pesos;
    }

}
