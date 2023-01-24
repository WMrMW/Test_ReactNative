
package model;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


public class Peso implements Serializable {

    private int id;
    
    private float valor;
    private int user_id;

    public Peso(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public Peso() {
    }

    public void setId(int id) {
        this.id = id;
    }

    public Peso(int id, float valor, int user_id) {
        this.id = id;
        this.valor = valor;
        this.user_id = user_id;
    }

    public Peso(float valor, int user_id) {
        this.valor = valor;
        this.user_id = user_id;
    }

    public float getValor() {
        return valor;
    }

    public void setValor(float valor) {
        this.valor = valor;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }
}
