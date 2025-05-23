import { Model } from 'sequelize';

   export default (sequelize, DataTypes) => {
     class AuditLogs extends Model {
       static associate(models) {
         AuditLogs.belongsTo(models.UserProfiles, {
           foreignKey: 'user_profile_id',
           as: 'userProfile',
         });
       }
     }

     const modelDefinition = {
       id: {
         type: DataTypes.UUID,
         defaultValue: DataTypes.UUIDV4,
         primaryKey: true,
       },
       user_profile_id: {
         type: DataTypes.UUID,
         allowNull: false,
         references: {
           model: 'user_profiles',
           key: 'userId',
         },
       },
       action: {
         type: DataTypes.STRING,
         allowNull: false,
       },
       details: {
         type: DataTypes.JSON,
         allowNull: true,
       },
       createdAt: {
         type: DataTypes.DATE,
         allowNull: false,
         defaultValue: DataTypes.NOW,
       },
       updatedAt: {
         type: DataTypes.DATE,
         allowNull: false,
         defaultValue: DataTypes.NOW,
       },
     };

     console.log('AuditLogs model definition:', JSON.stringify(modelDefinition, null, 2));

     AuditLogs.init(modelDefinition, {
       sequelize,
       modelName: 'AuditLogs',
       tableName: 'audit_logs',
       timestamps: true,
     });

     return AuditLogs;
   };