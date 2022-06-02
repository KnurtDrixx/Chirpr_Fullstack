import * as mysql from 'mysql';
import {sqlConfig} from '../config'

const pool = mysql.createPool(sqlConfig);

export const queryAll = <T = mysql.OkPacket> (sqlString: string, values: unknown[]) => {
    return new Promise<T>((resolve, reject) => {
        pool.query(sqlString, values, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}

// queryAll('Select * FROM Chirps WHERE id = ?', [4])