package DAO;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.Query;
import model.Peso;
import model.User;

public class PesoDAO {

    private final EntityManager em;

    public PesoDAO(EntityManager em) {
        this.em = em;
    }

    public Peso insertSemAtt(Peso peso) {
        em.persist(peso);
        return peso;
    }

    public Peso insert(Peso peso) {

        em.persist(peso);

        UserDAO userDao = new UserDAO(em);
        User usuario = userDao.selectUser(new User(peso.getUser_id()));
        usuario.setPeso(peso.getValor());
        float im = usuario.getPeso() / (usuario.getAltura() * usuario.getAltura());
        usuario.setImc(im);
        userDao.uptade(usuario);
        return peso;
    }

    public List<Peso> selectAll(int user_Id) {
        String jpql = "select p from Peso as p "
                + "where user_id = :pUser_id";
        Query query = em.createQuery(jpql);
        query.setParameter("pUser_id", user_Id);
        return retornarListaComBaseNaConsulta(query);
    }

    private List<Peso> retornarListaComBaseNaConsulta(Query query) {
        List<Peso> pesos;
        try {
            pesos = query.getResultList();
        } catch (NoResultException e) {
            pesos = new ArrayList<>();
        }
        return pesos;
    }

    public void delete(Peso peso) {
        peso = em.merge(peso);
        em.remove(peso);
    }
}
