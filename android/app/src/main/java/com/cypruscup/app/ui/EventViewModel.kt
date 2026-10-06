package com.cypruscup.app.ui

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.cypruscup.app.api.ApiClient
import com.cypruscup.app.data.EventEntity
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class EventViewModel : ViewModel() {
    private val _events = MutableStateFlow<List<EventEntity>>(emptyList())
    val events: StateFlow<List<EventEntity>> = _events

    private val _isLoading = MutableStateFlow(true)
    val isLoading: StateFlow<Boolean> = _isLoading

    private val _error = MutableStateFlow<String?>(null)
    val error: StateFlow<String?> = _error

    init {
        fetchEvents()
    }

    private fun fetchEvents() {
        viewModelScope.launch {
            try {
                _isLoading.value = true
                _error.value = null
                // Запрос к нашему Node.js API Gateway (Retrofit работает в фоне)
                val fetchedEvents = ApiClient.instance.getEvents()
                _events.value = fetchedEvents
            } catch (e: Exception) {
                // Если нет интернета или сервер недоступен
                _error.value = e.localizedMessage ?: "Unknown network error"
            } finally {
                _isLoading.value = false
            }
        }
    }
}
