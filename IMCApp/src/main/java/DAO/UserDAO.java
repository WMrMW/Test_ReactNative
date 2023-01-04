package DAO;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.Query;
import model.Peso;
import model.User;

public class UserDAO {

    private final EntityManager em;

    public UserDAO(EntityManager em) {
        this.em = em;
    }

    public User insert(User usuario) {
        em.persist(usuario);
        Peso pes = new Peso(usuario.getPeso(), usuario.getId());
        PesoDAO pesoDAO = new PesoDAO(em);
        Peso insertSemAtt = pesoDAO.insertSemAtt(pes);
        return usuario;
    }

    public User uptade(User usuario) {
        em.merge(usuario);
        em.persist(usuario);
        return usuario;
    }

    public void delete(User usuario) {
        em.merge(usuario);
        em.remove(usuario);
    }

    public User selectUser(User usuario) {
        String jpql = "select u from User as u "
                + "where id = :pUserId";
        Query query = em.createQuery(jpql);
        query.setParameter("pUserId", usuario.getId());
        return retornarListaComBaseNaConsulta(query).get(0);
    }

    public List<User> selectAll() {
        String jpql = "select u from User as u";
        Query query = em.createQuery(jpql);
        return retornarListaComBaseNaConsulta(query);
    }

    private List<User> retornarListaComBaseNaConsulta(Query query) {
        List<User> usuarios;
        try {
            usuarios = query.getResultList();
        } catch (NoResultException e) {
            usuarios = new ArrayList<>();
        }
        return usuarios;
    }

    public boolean existeUser(User usuario) {
        String jpql = "select u from User as u "
                + "where u.email = :pEmail and u.senha = :pSenha";

        Query query = em.createQuery(jpql);
        query.setParameter("pEmail", usuario.getEmail());
        query.setParameter("pSenha", usuario.getSenha());
        
        return !retornarListaComBaseNaConsulta(query).isEmpty();
    }
    public User selectUserPorEmailSenha(User usuario) {
        String jpql = "select u from User as u "
                + "where u.email = :pEmail and u.senha = :pSenha";

        Query query = em.createQuery(jpql);
        query.setParameter("pEmail", usuario.getEmail());
        query.setParameter("pSenha", usuario.getSenha());
        
        return retornarListaComBaseNaConsulta(query).get(0);
    }
}
