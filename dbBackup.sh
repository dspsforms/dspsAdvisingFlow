
# see https://docs.mongodb.com/manual/tutorial/backup-and-restore-tools/

OUT_DIR=dbBackup/2020-06-30-mongodata
mongodump --out=${OUT_DIR} 
