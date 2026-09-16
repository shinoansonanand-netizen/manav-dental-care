import { query } from './db';

export type AppointmentStatus = 'pending' | 'contacted' | 'confirmed' | 'completed' | 'cancelled';

export interface AppointmentRecord {
  id: string;
  name: string;
  phone: string;
  email?: string;
  preferred_date: string;
  preferred_time: string;
  treatment: string;
  message?: string;
  status: AppointmentStatus;
  created_at: string;
  updated_at: string;
}

export async function getAllAppointments(): Promise<AppointmentRecord[]> {
  try {
    const rows = await query('SELECT * FROM appointments ORDER BY created_at DESC');
    return rows as AppointmentRecord[];
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return [];
  }
}

export async function createAppointment(record: Omit<AppointmentRecord, 'id' | 'status' | 'created_at' | 'updated_at'>): Promise<AppointmentRecord> {
  const id = `apt-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 5)}`;
  const now = new Date().toISOString();
  
  const newAppointment: AppointmentRecord = {
    ...record,
    id,
    status: 'pending',
    created_at: now,
    updated_at: now
  };

  const sql = `
    INSERT INTO appointments (id, name, phone, email, preferred_date, preferred_time, treatment, message, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [
    newAppointment.id,
    newAppointment.name,
    newAppointment.phone,
    newAppointment.email || null,
    newAppointment.preferred_date,
    newAppointment.preferred_time,
    newAppointment.treatment,
    newAppointment.message || null,
    newAppointment.status
  ];

  await query(sql, params);
  
  return newAppointment;
}

export async function updateAppointmentStatus(id: string, newStatus: AppointmentStatus): Promise<AppointmentRecord | null> {
  try {
    const sql = `UPDATE appointments SET status = ? WHERE id = ?`;
    await query(sql, [newStatus, id]);

    // Fetch the updated record
    const rows = await query('SELECT * FROM appointments WHERE id = ?', [id]) as AppointmentRecord[];
    if (rows.length === 0) return null;
    return rows[0];
  } catch (error) {
    console.error("Error updating appointment:", error);
    return null;
  }
}
