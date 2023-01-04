package view;

import java.util.List;

import javax.swing.table.DefaultTableModel;
import model.User;
import DAO.UserDAO;
import dao.JPAUtil;
import javax.persistence.EntityManager;

public class CrudUsers extends javax.swing.JFrame {

    public CrudUsers(){
        initComponents();
        getUsers();
    }

    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jScrollPane1 = new javax.swing.JScrollPane();
        jTable1 = new javax.swing.JTable();
        jButton1 = new javax.swing.JButton();

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);

        jTable1.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {

            },
            new String [] {
                "id", "email"
            }
        ));
        jScrollPane1.setViewportView(jTable1);

        jButton1.setText("remover");
        jButton1.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton1ActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 267, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 58, Short.MAX_VALUE)
                .addComponent(jButton1)
                .addGap(51, 51, 51))
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(jScrollPane1, javax.swing.GroupLayout.DEFAULT_SIZE, 319, Short.MAX_VALUE)
            .addGroup(layout.createSequentialGroup()
                .addGap(100, 100, 100)
                .addComponent(jButton1)
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );

        pack();
    }// </editor-fold>//GEN-END:initComponents

    private void jButton1ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton1ActionPerformed

        if (jTable1.getSelectedRow() != -1) {
            EntityManager em = new JPAUtil().getEntityManager();
            em.getTransaction().begin();
            UserDAO userDao = new UserDAO(em);
            String cod_user = jTable1.getValueAt(jTable1.getSelectedRow(), 0).toString();
            User usuario = new User(Integer.parseInt(cod_user));
            userDao.delete(usuario);
            DefaultTableModel defaultTablemodel = (DefaultTableModel) jTable1.getModel();
            defaultTablemodel.removeRow(jTable1.getSelectedRow());
            getUsers();
        }
    }//GEN-LAST:event_jButton1ActionPerformed

    private void getUsers() {
        EntityManager em = new JPAUtil().getEntityManager();
        em.getTransaction().begin();
        UserDAO userDao = new UserDAO(em);
        List<User> usuarios;
        usuarios = userDao.selectAll();
        DefaultTableModel model = (DefaultTableModel) jTable1.getModel();
        model.setRowCount(0);
        for (int i = 0; i < usuarios.size(); i++) { //loop que preenche a tabela com os produtos, um em cada linha
            User use = usuarios.get(i);
            String[] linha = {"" + use.getId(), use.getEmail()};
            model.addRow(linha);
        }
        em.getTransaction().commit();
        em.close();
    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton jButton1;
    private javax.swing.JScrollPane jScrollPane1;
    private javax.swing.JTable jTable1;
    // End of variables declaration//GEN-END:variables
}
