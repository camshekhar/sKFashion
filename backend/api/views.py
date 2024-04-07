from rest_framework.response import Response
from .models import Category, SubCategory, Product, Cart, OrderSummary, User
from .serializers import ProductSerializer, CategorySerializer, SubCategorySerializer, CartSerializer, OrderSummarySerializer, UserChangePasswordSerializer, UserLoginSerializer, UserProfileSerializer, UserRegistrationSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
# Create your views here.

# Manually generate Token for Authentication.
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
    
    
@api_view(['POST'])
def userRegistration(request):
    userRegSerializer = UserRegistrationSerializer(data=request.data)
    if (userRegSerializer.is_valid(raise_exception=True)):
        user = userRegSerializer.save()
        token = get_tokens_for_user(user)
        return Response({'token': token,'msg': 'Registration Successful.'}, status=status.HTTP_201_CREATED)
    return Response(userRegSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def userLogin(request):
    userLogSerializer = UserLoginSerializer(data=request.data)
    if (userLogSerializer.is_valid(raise_exception=True)):
        email = userLogSerializer.data.get('email')
        password = userLogSerializer.data.get('password')
        user = authenticate(email=email, password=password)
        if (user is not None):
            token = get_tokens_for_user(user)
            return Response({'token': token, 'msg': 'Login Successful.'}, status=status.HTTP_200_OK)
        else:
            return Response({'errors':{'non_field_errors':['Email or Password is not Valid!']}}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def userChangePassword(request):
    changePswdSerializer = UserChangePasswordSerializer(data=request.data, context={'user':request.user})
    if changePswdSerializer.is_valid(raise_exception=True):
        return Response({'msg': 'Password Changed Successfully.'}, status=status.HTTP_202_ACCEPTED)
    
    return Response(changePswdSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes((IsAuthenticated, )) 
def userProfile(request):  
    userSerializer = UserProfileSerializer(request.user)
    print(userSerializer.data)
    return Response(userSerializer.data, status=status.HTTP_200_OK)
   
    
      
@api_view(['GET'])
def productDetails(request, subCategory):
    product = Product.objects.get(subCategory = subCategory)
    serializer = ProductSerializer(product, many= False)
    return Response(serializer.data)

@api_view(['GET'])
def categories(request):
    category = Category.objects.all()
    serializer = CategorySerializer(category, many= True)
    return Response(serializer.data)

@api_view(['GET'])
def subCategory(request, category ):
    categories = SubCategory.objects.filter(category = category)
    serializer = SubCategorySerializer(categories, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def popularProducts(request):
    products = SubCategory.objects.all()
    serializer = SubCategorySerializer(products, many= True)
    return Response(serializer.data)

@api_view(['GET'])
# @permission_classes((IsAuthenticated, ))
def cart(request):
    cartDetail = Cart.objects.all()
    serializer = CartSerializer(cartDetail, many= True)
    return Response(serializer.data)

@api_view(['POST'])
def addtoCart(request):
    cartItem = CartSerializer(data = request.data)
    # print(cartItem)
    if cartItem.is_valid():
        cartItem.save()
        # message = "Item Added to Cart"
        return Response(cartItem.data, status=status.HTTP_201_CREATED)
    # message = "Item Already in Cart"
    return Response(cartItem.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def updateCartQty(request, id, scope):
    cartItem = Cart.objects.get(id = id)
    if scope == "inc":
        cartItem.quantity = int(cartItem.quantity) + 1 if(int(cartItem.quantity) + 1) < 10 else 10;
    elif scope == "dec":
        cartItem.quantity = int(cartItem.quantity) - 1 if (int(cartItem.quantity) - 1) > 1 else 1;    
    cartItem.save() 
    return Response(status=status.HTTP_201_CREATED)

@api_view(['DELETE'])
def deleteCartItem(request, id):
    cartItem = Cart.objects.get(id = id)
    cartItem.delete();
    return Response(status=status.HTTP_200_OK)    
        
        
def orderSummary(request):
    order = OrderSummary.objects.all()
    cart = Cart.objects.all()
    for price in cart:
        price = cart.price * cart.quantity
    order.subtotal = price
    if order.subtotal < 500:
        order.total = order.subtotal
        order.save()    
        
    else:
        order.total = order.subtotal + order.shippingCharge 
        order.save()    
        
    order.save()    
    serializer = OrderSummarySerializer(order, many= True)
    return Response(serializer.data)    

def checkout(request):
    pass