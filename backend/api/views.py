from rest_framework.response import Response
from .models import Category, SubCategory, Product, Cart, OrderSummary, User, Feedback, Address
from .serializers import ProductSerializer, CategorySerializer, SubCategorySerializer, CartSerializer, OrderSummarySerializer, UserChangePasswordSerializer, UserLoginSerializer, UserProfileSerializer, UserRegistrationSerializer, FeedbackSerializer, ProductSerializer, AddressSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q

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
    # print(userSerializer.data)
    return Response(userSerializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def addUserAddress(request):
    address = AddressSerializer(data = request.data)
    # print(address)
    if address.is_valid():
        address.save()
        # message = "Item Added to Cart"
        return Response(address.data, status=status.HTTP_201_CREATED)
    # message = "Item Already in Cart"
    return Response(address.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['GET'])
# def getCustomerDetail(request, cust_id):
#     addresses = User.objects.get(id = cust_id)
#     serializer = UserProfileSerializer(addresses, many= False)
#     # print(serializer.data)
#     return Response(serializer.data)

@api_view(['GET'])
def getCustomers(request):
    customers = User.objects.exclude(username = "admin")
    # print(len(customers))
    userSerializer = UserProfileSerializer(customers, many=True)
    # print(userSerializer.data)
    return Response(userSerializer.data)

@api_view(['GET'])
def getUserAddressReport(request):
    addresses = Address.objects.all()
    serializer = AddressSerializer(addresses, many= True)
    # print(serializer.data)
    return Response(serializer.data)

@api_view(['GET'])
def getUserAddress(request, cust_id):
    addresses = Address.objects.filter(cust_id = cust_id)
    serializer = AddressSerializer(addresses, many= True)
    # print(serializer.data)
    return Response(serializer.data) 

@api_view(['GET'])
def getOrderAddress(request, add_id):
    addresses = Address.objects.get(id = add_id)
    serializer = AddressSerializer(addresses, many= False)
    # print(serializer.data)
    return Response(serializer.data)
   
@api_view(['GET'])
def productDetails(request, subCategory):
    filter_conditions = Q(subCategory=subCategory) | Q(title=subCategory)
    product = Product.objects.get(filter_conditions)

    # subCat = Product.objects.filter(subCategory=subCategory)
    # product = Product.objects.get(title=subCategory)
    # if subCat:
    #     serializer = ProductSerializer(subCat, many=True)
    # if product:

    serializer = ProductSerializer(product, many=False)

    # print(serializer.data)
    return Response(serializer.data)

@api_view(['GET'])
def categories(request):
    category = Category.objects.all()
    serializer = CategorySerializer(category, many= True)
    return Response(serializer.data)

@api_view(['GET'])
def subCategory(request, category ):
    filter_conditions = Q(category=category) | Q(title=category)
    # filter_conditions = Q({"category": category, "title": category})
    categories = SubCategory.objects.filter(filter_conditions)
    serializer = SubCategorySerializer(categories, many=True)
    # print(serializer.data)
    return Response(serializer.data)

@api_view(['GET'])
def popularProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many= True)
    return Response(serializer.data)

@api_view(['GET'])
# @permission_classes((IsAuthenticated, ))
def cart(request, cust_id):
    cartDetail = Cart.objects.filter(cust_id = cust_id)
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
    cartItem.delete()
    return Response(status=status.HTTP_200_OK)    


@api_view(['POST'])
def saveOrderDetail(request):
    order = OrderSummarySerializer(data = request.data)
    print(order)
    if order.is_valid():
        order.save()
        # message = "Item Added to Cart"
        return Response(order.data, status=status.HTTP_201_CREATED)
    # message = "Item Already in Cart"
    return Response(order.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def emptyOrderedCart(request, id):
    cartItem = Cart.objects.filter(cust_id = id)
    cartItem.delete()
    return Response(status=status.HTTP_200_OK)    

@api_view(['GET'])
def getMyOrders(request, cust_id):
    orders = OrderSummary.objects.filter(cust = cust_id)
    serializer = OrderSummarySerializer(orders, many=True)
    # print(serializer.data)
    return Response(serializer.data)

@api_view(['GET'])
def getInvoiceDetails(request, order_id):
    invoice = OrderSummary.objects.get(id = order_id)
    invoice_serializer = OrderSummarySerializer(invoice, many=False)
    # print(invoice_serializer.data)
    return Response(invoice_serializer.data)

@api_view(['GET'])
def getTotalSales(request):
    sales = OrderSummary.objects.all()
    sales_serializer = OrderSummarySerializer(sales, many=True)
    print(sales_serializer.data)
    return Response(sales_serializer.data)

@api_view(['GET'])
def feedback(request, prod_id):
    
    feedbacks = Feedback.objects.filter(prod_id = prod_id)
    # print(feedbacks)
    serializer = FeedbackSerializer(feedbacks, many= True)
    # print(serializer.data)
    return Response(serializer.data)

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

@api_view(['GET'])
def feedback(request, prod_id):
    
    feedbacks = Feedback.objects.filter(prod_id = prod_id)
    # print(feedbacks)
    serializer = FeedbackSerializer(feedbacks, many= True)
    # print(serializer.data)
    return Response(serializer.data)

@api_view(['GET'])
def searchResults(request, slug):
    # print(slug)
    slug = slug.lower()
    products = SubCategory.objects.all()
    search_results = []
    # or slug == product.category.lower() or slug == product.subCategory.lower():
    for product in products:
        if slug in product.title.lower():
            search_results.append(product)
        # if re.search(slug,product.title.lower()):
        #     search_results.append(product)

    # print(slug)
    # print(search_results)
    serializer = SubCategorySerializer(search_results, many= True)
    # print(serializer.data)
    return Response(serializer.data)


@api_view(['GET'])
def getStockCount(request, prod_id):
    stockCount = Product.objects.get(id=prod_id).stockCount
    print(stockCount)
    return Response(stockCount)
    