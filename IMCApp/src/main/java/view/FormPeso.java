package view;

import java.sql.SQLException;
import javax.swing.table.DefaultTableModel;
import model.Peso;
import DAO.PesoDAO;
import dao.JPAUtil;
import java.util.List;
import javax.persistence.EntityManager;

public class FormPeso extends javax.swing.JFrame {

    public FormPeso() throws SQLException {
        initComponents();
        getPesos();
    }

    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jScrollPane1 = new javax.swing.JScrollPane();
        jTable1 = new javax.swing.JTable();
        jButton1 = new javax.swing.JButton();
        jButton2 = new javax.swing.JButton();
        quantIn = new javax.swing.JTextField();

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);

        jTable1.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {

            },
            new String [] {
                "id", "Valor"
            }
        ));
        jScrollPane1.setViewportView(jTable1);

        jButton1.setText("Remover");
        jButton1.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton1ActionPerformed(evt);
            }
        });

        jButton2.setText("Adicionar");
        jButton2.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton2ActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 217, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 57, Short.MAX_VALUE)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jButton1, javax.swing.GroupLayout.Alignment.TRAILING)
                    .addComponent(jButton2, javax.swing.GroupLayout.Alignment.TRAILING)
                    .addComponent(quantIn, javax.swing.GroupLayout.Alignment.TRAILING, javax.swing.GroupLayout.PREFERRED_SIZE, 77, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addGap(49, 49, 49))
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 0, Short.MAX_VALUE)
            .addGroup(layout.createSequentialGroup()
                .addGap(36, 36, 36)
                .addComponent(quantIn, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(38, 38, 38)
                .addComponent(jButton2)
                .addGap(18, 18, 18)
                .addComponent(jButton1)
                .addContainerGap(142, Short.MAX_VALUE))
        );

        pack();
        setLocationRelativeTo(null);
    }// </editor-fold>//GEN-END:initComponents

    private void jButton2ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton2ActionPerformed

        EntityManager em = new JPAUtil().getEntityManager();
        em.getTransaction().begin();
        PesoDAO pesodao = new PesoDAO(em);
        Peso peso = new Peso(Float.parseFloat(quantIn.getText()), Login.getId());
        Peso insertSemAtt = pesodao.insert(peso);
        em.getTransaction().commit();
        em.close();
        getPesos();
    }//GEN-LAST:event_jButton2ActionPerformed

    private void jButton1ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton1ActionPerformed
        EntityManager em = new JPAUtil().getEntityManager();
        em.getTransaction().begin();
        if (jTable1.getSelectedRow() != -1) {
            PesoDAO pesodao = new PesoDAO(em);
            String cod_peso = jTable1.getValueAt(jTable1.getSelectedRow(), 0).toString();
            String valor = jTable1.getValueAt(jTable1.getSelectedRow(),1).toString();
            Peso pes = new Peso(Integer.parseInt(cod_peso),Float.parseFloat(valor),Login.getId());
            pesodao.delete(pes);
            DefaultTableModel defaultTablemodel = (DefaultTableModel) jTable1.getModel();
            defaultTablemodel.removeRow(jTable1.getSelectedRow());
        }
        em.getTransaction().commit();
        em.close();
        getPesos();

    }//GEN-LAST:event_jButton1ActionPerformed

    private void getPesos() {
        EntityManager em = new JPAUtil().getEntityManager();
        em.getTransaction().begin();
        PesoDAO pesodao = new PesoDAO(em);

        List<Peso> pesos = pesodao.selectAll(Login.getId());
        DefaultTableModel model = (DefaultTableModel) jTable1.getModel();
        model.setRowCount(0);
        for (int i = 0; i < pesos.size(); i++) { //loop que preenche a tabela com os produtos, um em cada linha
            Peso use = pesos.get(i);
            String[] linha = {"" + use.getId(), "" + use.getValor()};
            model.addRow(linha);
        }
        em.getTransaction().commit();
        em.close();
    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton jButton1;
    private javax.swing.JButton jButton2;
    private javax.swing.JScrollPane jScrollPane1;
    private javax.swing.JTable jTable1;
    private javax.swing.JTextField quantIn;
    // End of variables declaration//GEN-END:variables
}
