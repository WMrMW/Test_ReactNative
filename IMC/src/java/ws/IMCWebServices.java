/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ws;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import dao.Conexao;
import dao.PesoDAO;
import dao.UserDAO;
import java.lang.reflect.Type;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import model.Peso;
import model.User;

/**
 * REST Web Service
 *
 * @author Márcio
 */
@Path("generic")
public class IMCWebServices {

    @Context
    private UriInfo context;

    public IMCWebServices() {
    }

    @GET
    @Produces("application/json")
    public String getJson() {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
    }

    @GET
    @Produces("application/json")
    @Path("User/getUser/{id}")
    public String getUser(@PathParam("id") int id) throws SQLException, ClassNotFoundException {
        Gson g = new Gson();
        User usuario = new User();
        Connection conexao = new Conexao().getConexao();
        UserDAO userdao = new UserDAO(conexao);
        usuario = userdao.getUserPorId(id);
        System.out.println("Busca pelo usuario com os dados informados feita com sucesso!");
        conexao.close();
        return g.toJson(usuario);
    }

    @GET
    @Produces("application/json")
    @Path("User/login/{email}/{senha}")
    public String getUser(@PathParam("email") String email, @PathParam("senha") String senha) throws SQLException, ClassNotFoundException {
        Gson g = new Gson();
        User usuario = new User();

        Connection conexao = new Conexao().getConexao();
        UserDAO userdao = new UserDAO(conexao);
        usuario = userdao.getUserPorEmaileSenha(new User(email, senha));
        System.out.println("Busca pelo usuario com os dados informados feita com sucesso!");
        conexao.close();
        return g.toJson(usuario);
    }

    @GET
    @Produces("application/json")
    @Path("Peso/delete/{id}")
    public boolean deletePeso(@PathParam("id") int id) throws SQLException, ClassNotFoundException {
        Connection conexao = new Conexao().getConexao();
        Peso pes;
        pes = new Peso(id);
        PesoDAO pesodao = new PesoDAO(conexao);
        pesodao.delete(pes);
        System.out.println("Peso de id:" + id + " foi excluido com sucesso!");
        conexao.close();
        return true;
    }

    @GET
    @Produces("application/json")
    @Path("Peso/listPorId/{id}")
    public String listPesos(@PathParam("id") int id) throws SQLException, ClassNotFoundException {

        Gson g = new Gson();
        List<Peso> pesos = new ArrayList<>();
        Connection conexao = new Conexao().getConexao();
        PesoDAO pesodao = new PesoDAO(conexao);
        pesos = pesodao.selectAllPesosUser(id);
        System.out.println("Busca de todos os pesos do usuario feita com sucesso!");
        conexao.close();
        return g.toJson(pesos);
    }

    @POST
    @Consumes("application/json")
    @Path("Peso/addPeso")
    public void addPeso(String pesoJson) throws SQLException, ClassNotFoundException {

        Gson g = new Gson();
        Peso peso = new Peso();
        Type pesoType = new TypeToken<Peso>() {
        }.getType();
        peso = g.fromJson(pesoJson, pesoType);
        Connection conexao = new Conexao().getConexao();
        PesoDAO pesodao = new PesoDAO(conexao);
        pesodao.insert(peso);
        System.out.println("Peso foi inserido na tabela com sucesso!");
        conexao.close();
    }

    @POST
    @Consumes("application/json")
    @Path("User/addUser")
    public String addUser(String userJson) throws SQLException, ClassNotFoundException {
        Gson g = new Gson();
        User usuario = new User();
        Type userType = new TypeToken<User>() {
        }.getType();
        usuario = g.fromJson(userJson, userType);
        usuario.atualizaIMC();
        Connection conexao = new Conexao().getConexao();
        UserDAO userDao = new UserDAO(conexao);
        String msg = userDao.insert(usuario);
        conexao.close();
        return g.toJson(msg);
    }

    @POST
    @Consumes("application/json")
    @Path("User/editAltura")
    public void editAlt(String userJson) throws SQLException, ClassNotFoundException {

        Gson g = new Gson();
        User usuario = new User();
        Type userType = new TypeToken<User>() {
        }.getType();
        usuario = g.fromJson(userJson, userType);
        usuario.atualizaIMC();
        Connection conexao = new Conexao().getConexao();
        UserDAO userDAO = new UserDAO(conexao);
        System.out.println(usuario.getAltura());
        userDAO.updateAltura(usuario);
        System.out.println("Dados do usuario informado atualizado com sucesso!");
        conexao.close();
    }

    @POST
    @Consumes("application/json")
    @Path("User/editPeso")
    public void editPeso(String userJson) throws SQLException, ClassNotFoundException {

        Gson g = new Gson();
        User usuario = new User();
        Type userType = new TypeToken<User>() {
        }.getType();
        usuario = g.fromJson(userJson, userType);
        usuario.atualizaIMC();
        Connection conexao = new Conexao().getConexao();
        UserDAO userDAO = new UserDAO(conexao);
        userDAO.updatePeso(usuario);
        System.out.println("Dados do usuario informado atualizado com sucesso!");
        conexao.close();
    }

    @GET
    @Produces("application/json")
    @Path("User/list")
    public String listUsers() throws SQLException, ClassNotFoundException {

        Gson g = new Gson();
        List<User> usuarios = new ArrayList<>();
        Connection conexao = new Conexao().getConexao();
        UserDAO userdao = new UserDAO(conexao);
        usuarios = userdao.selectAllUsers();
        System.out.println("Busca de todos os usuarios feita com sucesso!");
        conexao.close();
        return g.toJson(usuarios);
    }

    /**
     * PUT method for updating or creating an instance of IMCWebServices
     *
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public void putJson(String content) {
    }
}
