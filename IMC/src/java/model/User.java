
package model;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;



public class User implements Serializable {

    private int id;
    private String nome;
    private String email;

    public User() {
    }
    private String senha;
    private String data_Nasc;
    private float altura;
    private float peso;

    public User(String nome, String email, String senha, String data_Nasc) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.data_Nasc = data_Nasc;
    }
    private float imc;

    public User(int id, String nome, String email, String senha, String data_Nasc, float altura, float peso, float imc) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.data_Nasc = data_Nasc;
        this.altura = altura;
        this.peso = peso;
        this.imc = imc;
    }

    public User(int id) {
        this.id = id;
    }



    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getData_Nasc() {
        return data_Nasc;
    }

    public void setData_Nasc(String data_Nasc) {
        this.data_Nasc = data_Nasc;
    }

    public float getAltura() {
        return altura;
    }

    public void setAltura(float altura) {
        this.altura = altura;
    }

    public User(String nome, String email, String senha, String data_Nasc,float altura, float peso) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.data_Nasc = data_Nasc;
        this.altura = altura;
        this.peso = peso;
        this.imc = peso/(altura*altura);
    }

    public float getPeso() {
        return peso;
    }

    public User(String email, String senha) {
        this.email = email;
        this.senha = senha;
    }

    public void setPeso(float peso) {
        this.peso = peso;
    }

    public float getImc() {
        return imc;
    }

    public void setImc(float imc) {
        this.imc = imc;
    }
}
