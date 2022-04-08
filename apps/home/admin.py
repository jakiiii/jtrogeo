from django.contrib import admin
from apps.home.models import SHP


@admin.register(SHP)
class SHPAdmin(admin.ModelAdmin):
    list_display = ['name', 'uploaded_date']
    search_fields = ['name']
    list_filter = ['uploaded_date']
