package com.cypruscup.app.data

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "events")
data class EventEntity(
    @PrimaryKey val id: String,
    val title: String,
    val location: String,
    val startDate: String,
    val description: String,
    // Флаг, который показывает, что данные актуальны и синхронизированы с Supabase
    val isSynced: Boolean = true 
)
