import datetime
from django.db import models

from ckeditor.fields import RichTextField

from base.models import BaseModel
from apps.home.utils import shp_file_directory_path


class SHP(BaseModel):
    name = models.CharField(
        max_length=50
    )
    description = RichTextField(
        max_length=1000,
        blank=True
    )
    file = models.FileField(
        upload_to=shp_file_directory_path
    )
    uploaded_date = models.DateField(
        default=datetime.date.today,
        blank=True
    )

    def __str__(self) -> str:
        return self.name

    class Meta:
        ordering = ('created_at',)
        verbose_name = "SHP"
        verbose_name_plural = "SHP"
        db_table = "shp"
