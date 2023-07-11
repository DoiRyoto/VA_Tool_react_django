from django.shortcuts import render
from rest_framework import viewsets
from django.http import HttpResponse
from .serializers import PostSerializer
from .models import Post


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer