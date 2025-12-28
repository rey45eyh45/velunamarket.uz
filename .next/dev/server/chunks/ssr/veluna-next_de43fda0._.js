module.exports = [
"[project]/veluna-next/lib/supabase/client.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
// =====================================================
// SUPABASE CLIENT - Browser (Client Components)
// =====================================================
var __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/veluna-next/node_modules/@supabase/ssr/dist/module/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/veluna-next/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-ssr] (ecmascript)");
;
function createClient() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createBrowserClient"])(("TURBOPACK compile-time value", "https://cpvqwudkrgrovlsweads.supabase.co"), ("TURBOPACK compile-time value", "sb_publishable_lodoHYlYmXFeS_K8NqLx6w_zm7TZVtb"));
}
}),
"[project]/veluna-next/services/products.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCategories",
    ()=>getCategories,
    "getFeaturedProducts",
    ()=>getFeaturedProducts,
    "getProductBySlug",
    ()=>getProductBySlug,
    "getProducts",
    ()=>getProducts,
    "getProductsByCategory",
    ()=>getProductsByCategory,
    "searchProducts",
    ()=>searchProducts
]);
// =====================================================
// PRODUCTS SERVICE - API Layer
// =====================================================
var __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/veluna-next/lib/supabase/client.ts [app-ssr] (ecmascript)");
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
async function getProducts(filters, page = 1, limit = 12) {
    let query = supabase.from('products').select('*, category:categories(*)', {
        count: 'exact'
    }).eq('is_active', true);
    // Apply filters
    if (filters?.category) {
        query = query.eq('category_id', filters.category);
    }
    if (filters?.minPrice) {
        query = query.gte('price', filters.minPrice);
    }
    if (filters?.maxPrice) {
        query = query.lte('price', filters.maxPrice);
    }
    if (filters?.inStock) {
        query = query.gt('stock', 0);
    }
    if (filters?.search) {
        query = query.ilike('name', `%${filters.search}%`);
    }
    // Apply sorting
    switch(filters?.sortBy){
        case 'price-asc':
            query = query.order('price', {
                ascending: true
            });
            break;
        case 'price-desc':
            query = query.order('price', {
                ascending: false
            });
            break;
        case 'newest':
            query = query.order('created_at', {
                ascending: false
            });
            break;
        case 'popular':
            query = query.order('reviews_count', {
                ascending: false
            });
            break;
        default:
            query = query.order('created_at', {
                ascending: false
            });
    }
    // Pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);
    const { data, error, count } = await query;
    if (error) {
        console.error('Error fetching products:', error);
        return {
            data: [],
            count: 0,
            page,
            limit,
            totalPages: 0
        };
    }
    return {
        data: data || [],
        count: count || 0,
        page,
        limit,
        totalPages: Math.ceil((count || 0) / limit)
    };
}
async function getProductBySlug(slug) {
    const { data, error } = await supabase.from('products').select('*, category:categories(*)').eq('slug', slug).eq('is_active', true).single();
    if (error) {
        console.error('Error fetching product:', error);
        return null;
    }
    return data;
}
async function getFeaturedProducts(limit = 8) {
    const { data, error } = await supabase.from('products').select('*, category:categories(*)').eq('is_active', true).eq('is_featured', true).order('created_at', {
        ascending: false
    }).limit(limit);
    if (error) {
        console.error('Error fetching featured products:', error);
        return [];
    }
    return data || [];
}
async function getProductsByCategory(categorySlug, limit = 12) {
    const { data, error } = await supabase.from('products').select('*, category:categories!inner(*)').eq('is_active', true).eq('category.slug', categorySlug).order('created_at', {
        ascending: false
    }).limit(limit);
    if (error) {
        console.error('Error fetching products by category:', error);
        return [];
    }
    return data || [];
}
async function getCategories() {
    const { data, error } = await supabase.from('categories').select('*').eq('is_active', true).order('sort_order', {
        ascending: true
    });
    if (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
    return data || [];
}
async function searchProducts(query, limit = 10) {
    const { data, error } = await supabase.from('products').select('*, category:categories(*)').eq('is_active', true).ilike('name', `%${query}%`).limit(limit);
    if (error) {
        console.error('Error searching products:', error);
        return [];
    }
    return data || [];
}
}),
"[project]/veluna-next/services/orders.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createOrder",
    ()=>createOrder,
    "getOrderById",
    ()=>getOrderById,
    "getOrderByNumber",
    ()=>getOrderByNumber,
    "getUserOrders",
    ()=>getUserOrders
]);
// =====================================================
// ORDERS SERVICE - API Layer
// =====================================================
var __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/veluna-next/lib/supabase/client.ts [app-ssr] (ecmascript)");
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
async function createOrder(formData, items, userId) {
    // Calculate totals
    const subtotal = items.reduce((sum, item)=>sum + item.product.price * item.quantity, 0);
    const shippingCost = subtotal > 500000 ? 0 : 30000; // Free shipping over 500,000 som
    const total = subtotal + shippingCost;
    // Create order
    const { data: order, error: orderError } = await supabase.from('orders').insert({
        user_id: userId || null,
        status: 'pending',
        payment_status: 'pending',
        subtotal,
        shipping_cost: shippingCost,
        discount: 0,
        total,
        customer_name: formData.customer_name,
        customer_phone: formData.customer_phone,
        customer_email: formData.customer_email || null,
        shipping_address: formData.shipping_address,
        shipping_city: formData.shipping_city,
        payment_method: formData.payment_method,
        notes: formData.notes || null
    }).select().single();
    if (orderError) {
        console.error('Error creating order:', orderError);
        return {
            order: null,
            error: 'Buyurtma yaratishda xatolik'
        };
    }
    // Create order items
    const orderItems = items.map((item)=>({
            order_id: order.id,
            product_id: item.product.id,
            product_name: item.product.name,
            product_image: item.product.image_url,
            price: item.product.price,
            quantity: item.quantity,
            total: item.product.price * item.quantity
        }));
    const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
    if (itemsError) {
        console.error('Error creating order items:', itemsError);
        // Rollback order
        await supabase.from('orders').delete().eq('id', order.id);
        return {
            order: null,
            error: 'Buyurtma yaratishda xatolik'
        };
    }
    return {
        order,
        error: null
    };
}
async function getUserOrders(userId) {
    const { data, error } = await supabase.from('orders').select('*, items:order_items(*)').eq('user_id', userId).order('created_at', {
        ascending: false
    });
    if (error) {
        console.error('Error fetching user orders:', error);
        return [];
    }
    return data || [];
}
async function getOrderById(orderId) {
    const { data, error } = await supabase.from('orders').select('*, items:order_items(*)').eq('id', orderId).single();
    if (error) {
        console.error('Error fetching order:', error);
        return null;
    }
    return data;
}
async function getOrderByNumber(orderNumber) {
    const { data, error } = await supabase.from('orders').select('*, items:order_items(*)').eq('order_number', orderNumber).single();
    if (error) {
        console.error('Error fetching order:', error);
        return null;
    }
    return data;
}
}),
"[project]/veluna-next/services/auth.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCurrentUser",
    ()=>getCurrentUser,
    "getProfile",
    ()=>getProfile,
    "resetPassword",
    ()=>resetPassword,
    "signIn",
    ()=>signIn,
    "signOut",
    ()=>signOut,
    "signUp",
    ()=>signUp,
    "updateProfile",
    ()=>updateProfile
]);
// =====================================================
// AUTH SERVICE - API Layer
// =====================================================
var __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/veluna-next/lib/supabase/client.ts [app-ssr] (ecmascript)");
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
async function signIn(data) {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
    });
    if (error) {
        console.error('Sign in error:', error);
        return {
            user: null,
            error: 'Email yoki parol noto\'g\'ri'
        };
    }
    return {
        user: authData.user ? {
            id: authData.user.id,
            email: authData.user.email,
            phone: authData.user.phone,
            created_at: authData.user.created_at
        } : null,
        error: null
    };
}
async function signUp(data) {
    const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
            data: {
                full_name: data.full_name,
                phone: data.phone
            }
        }
    });
    if (error) {
        console.error('Sign up error:', error);
        if (error.message.includes('already registered')) {
            return {
                user: null,
                error: 'Bu email allaqachon ro\'yxatdan o\'tgan'
            };
        }
        return {
            user: null,
            error: 'Ro\'yxatdan o\'tishda xatolik'
        };
    }
    // Create profile
    if (authData.user) {
        await supabase.from('profiles').insert({
            id: authData.user.id,
            full_name: data.full_name,
            phone: data.phone
        });
    }
    return {
        user: authData.user ? {
            id: authData.user.id,
            email: authData.user.email,
            phone: authData.user.phone,
            created_at: authData.user.created_at
        } : null,
        error: null
    };
}
async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('Sign out error:', error);
        return {
            error: 'Chiqishda xatolik'
        };
    }
    return {
        error: null
    };
}
async function getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    return {
        id: user.id,
        email: user.email,
        phone: user.phone,
        created_at: user.created_at
    };
}
async function getProfile(userId) {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (error) {
        console.error('Error fetching profile:', error);
        return null;
    }
    return data;
}
async function updateProfile(userId, updates) {
    const { data, error } = await supabase.from('profiles').update(updates).eq('id', userId).select().single();
    if (error) {
        console.error('Error updating profile:', error);
        return {
            profile: null,
            error: 'Profilni yangilashda xatolik'
        };
    }
    return {
        profile: data,
        error: null
    };
}
async function resetPassword(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${("TURBOPACK compile-time value", "http://localhost:3000")}/auth/reset-password`
    });
    if (error) {
        console.error('Reset password error:', error);
        return {
            error: 'Xatolik yuz berdi'
        };
    }
    return {
        error: null
    };
}
}),
"[project]/veluna-next/services/banners.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getBanners",
    ()=>getBanners
]);
// =====================================================
// BANNERS SERVICE - API Layer
// =====================================================
var __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/veluna-next/lib/supabase/client.ts [app-ssr] (ecmascript)");
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
async function getBanners() {
    const { data, error } = await supabase.from('banners').select('*').eq('is_active', true).order('sort_order', {
        ascending: true
    });
    if (error) {
        console.error('Error fetching banners:', error);
        return [];
    }
    return data || [];
}
}),
"[project]/veluna-next/services/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$services$2f$products$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/veluna-next/services/products.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$services$2f$orders$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/veluna-next/services/orders.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$services$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/veluna-next/services/auth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$services$2f$banners$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/veluna-next/services/banners.ts [app-ssr] (ecmascript)");
;
;
;
;
}),
"[project]/veluna-next/services/index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createOrder",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$services$2f$orders$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createOrder"],
    "getBanners",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$services$2f$banners$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBanners"],
    "getCategories",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$services$2f$products$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCategories"],
    "getCurrentUser",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$services$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCurrentUser"],
    "getFeaturedProducts",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$services$2f$products$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFeaturedProducts"],
    "getOrderById",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$services$2f$orders$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getOrderById"],
    "getOrderByNumber",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$services$2f$orders$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getOrderByNumber"],
    "getProductBySlug",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$services$2f$products$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProductBySlug"],
    "getProducts",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$services$2f$products$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProducts"],
    "getProductsByCategory",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$services$2f$products$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProductsByCategory"],
    "getProfile",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$services$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProfile"],
    "getUserOrders",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$services$2f$orders$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUserOrders"],
    "resetPassword",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$services$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resetPassword"],
    "searchProducts",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$services$2f$products$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["searchProducts"],
    "signIn",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$services$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signIn"],
    "signOut",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$services$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signOut"],
    "signUp",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$services$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signUp"],
    "updateProfile",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$services$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateProfile"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$services$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/veluna-next/services/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$services$2f$products$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/veluna-next/services/products.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$services$2f$orders$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/veluna-next/services/orders.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$services$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/veluna-next/services/auth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$services$2f$banners$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/veluna-next/services/banners.ts [app-ssr] (ecmascript)");
}),
"[project]/veluna-next/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateDiscount",
    ()=>calculateDiscount,
    "cn",
    ()=>cn,
    "debounce",
    ()=>debounce,
    "formatDate",
    ()=>formatDate,
    "formatPhone",
    ()=>formatPhone,
    "formatPrice",
    ()=>formatPrice,
    "formatRelativeTime",
    ()=>formatRelativeTime,
    "getOrderStatusColor",
    ()=>getOrderStatusColor,
    "getOrderStatusLabel",
    ()=>getOrderStatusLabel,
    "slugify",
    ()=>slugify,
    "storage",
    ()=>storage,
    "truncate",
    ()=>truncate,
    "validateEmail",
    ()=>validateEmail,
    "validatePhone",
    ()=>validatePhone
]);
// =====================================================
// UTILITY FUNCTIONS
// =====================================================
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function formatPrice(price) {
    return new Intl.NumberFormat('uz-UZ', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price) + ' so\'m';
}
function calculateDiscount(price, originalPrice) {
    if (!originalPrice || originalPrice <= price) return 0;
    return Math.round((1 - price / originalPrice) * 100);
}
function slugify(text) {
    return text.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');
}
function truncate(text, length) {
    if (text.length <= length) return text;
    return text.slice(0, length) + '...';
}
function formatDate(date) {
    return new Intl.DateTimeFormat('uz-UZ', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}
function formatRelativeTime(date) {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now.getTime() - past.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 1) return 'Hozirgina';
    if (diffMins < 60) return `${diffMins} daqiqa oldin`;
    if (diffHours < 24) return `${diffHours} soat oldin`;
    if (diffDays < 7) return `${diffDays} kun oldin`;
    return formatDate(date);
}
function validatePhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return /^998\d{9}$/.test(cleaned) || /^\d{9}$/.test(cleaned);
}
function formatPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 9) {
        return `+998 ${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 7)} ${cleaned.slice(7)}`;
    }
    if (cleaned.length === 12 && cleaned.startsWith('998')) {
        return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8, 10)} ${cleaned.slice(10)}`;
    }
    return phone;
}
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function getOrderStatusLabel(status) {
    const labels = {
        pending: 'Kutilmoqda',
        confirmed: 'Tasdiqlangan',
        processing: 'Jarayonda',
        shipped: 'Yo\'lda',
        delivered: 'Yetkazildi',
        cancelled: 'Bekor qilindi'
    };
    return labels[status] || status;
}
function getOrderStatusColor(status) {
    const colors = {
        pending: 'text-yellow-600 bg-yellow-100',
        confirmed: 'text-blue-600 bg-blue-100',
        processing: 'text-purple-600 bg-purple-100',
        shipped: 'text-orange-600 bg-orange-100',
        delivered: 'text-green-600 bg-green-100',
        cancelled: 'text-red-600 bg-red-100'
    };
    return colors[status] || 'text-gray-600 bg-gray-100';
}
function debounce(func, wait) {
    let timeout;
    return (...args)=>{
        clearTimeout(timeout);
        timeout = setTimeout(()=>func(...args), wait);
    };
}
const storage = {
    get: (key, defaultValue)=>{
        if ("TURBOPACK compile-time truthy", 1) return defaultValue;
        //TURBOPACK unreachable
        ;
    },
    set: (key, value)=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
    },
    remove: (key)=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
    }
};
}),
"[project]/veluna-next/app/profile/ProfileContent.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProfileContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/veluna-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/veluna-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$components$2f$ui$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/veluna-next/components/ui/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/veluna-next/components/ui/Button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/veluna-next/components/ui/Badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$services$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/veluna-next/services/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$services$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/veluna-next/services/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$store$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/veluna-next/store/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$store$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/veluna-next/store/auth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/veluna-next/node_modules/react-hot-toast/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/veluna-next/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/veluna-next/lib/utils.ts [app-ssr] (ecmascript)");
// =====================================================
// PROFILE CONTENT CLIENT COMPONENT
// =====================================================
'use client';
;
;
;
;
;
;
;
;
function ProfileContent({ user, profile, orders }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$store$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuthStore"])();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('profile');
    const handleLogout = async ()=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$services$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].logout();
            logout();
            __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success('Tizimdan chiqdingiz');
            router.push('/');
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error('Xatolik yuz berdi');
        }
    };
    const getStatusText = (status)=>{
        switch(status){
            case 'pending':
                return 'Kutilmoqda';
            case 'processing':
                return 'Tayyorlanmoqda';
            case 'shipped':
                return 'Jo\'natildi';
            case 'delivered':
                return 'Yetkazildi';
            case 'cancelled':
                return 'Bekor qilindi';
            default:
                return status;
        }
    };
    const getStatusVariant = (status)=>{
        switch(status){
            case 'delivered':
                return 'success';
            case 'pending':
                return 'warning';
            case 'cancelled':
                return 'danger';
            default:
                return 'default';
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid lg:grid-cols-4 gap-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lg:col-span-1",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-20 h-20 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-3xl font-bold text-primary-600",
                                        children: profile?.full_name?.[0] || user.email?.[0]?.toUpperCase() || 'U'
                                    }, void 0, false, {
                                        fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                                        lineNumber: 66,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                                    lineNumber: 65,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "font-semibold",
                                    children: profile?.full_name || 'Foydalanuvchi'
                                }, void 0, false, {
                                    fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                                    lineNumber: 70,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-500",
                                    children: user.email
                                }, void 0, false, {
                                    fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                                    lineNumber: 71,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                            lineNumber: 64,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveTab('profile'),
                                    className: `w-full text-left px-4 py-2 rounded-lg transition-colors ${activeTab === 'profile' ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`,
                                    children: "Profil ma'lumotlari"
                                }, void 0, false, {
                                    fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                                    lineNumber: 75,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveTab('orders'),
                                    className: `w-full text-left px-4 py-2 rounded-lg transition-colors ${activeTab === 'orders' ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`,
                                    children: [
                                        "Buyurtmalarim (",
                                        orders.length,
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                                    lineNumber: 85,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                            lineNumber: 74,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                            className: "my-6"
                        }, void 0, false, {
                            fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                            lineNumber: 97,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "outline",
                            className: "w-full text-red-500 border-red-500 hover:bg-red-50",
                            onClick: handleLogout,
                            children: "Chiqish"
                        }, void 0, false, {
                            fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                            lineNumber: 99,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                    lineNumber: 63,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lg:col-span-3",
                children: [
                    activeTab === 'profile' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xl font-semibold mb-6",
                                children: "Profil ma'lumotlari"
                            }, void 0, false, {
                                fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                                lineNumber: 113,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid md:grid-cols-2 gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-sm text-gray-500",
                                                        children: "To'liq ism"
                                                    }, void 0, false, {
                                                        fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                                                        lineNumber: 118,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-medium",
                                                        children: profile?.full_name || 'Kiritilmagan'
                                                    }, void 0, false, {
                                                        fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                                                        lineNumber: 119,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                                                lineNumber: 117,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-sm text-gray-500",
                                                        children: "Email"
                                                    }, void 0, false, {
                                                        fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                                                        lineNumber: 122,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-medium",
                                                        children: user.email
                                                    }, void 0, false, {
                                                        fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                                                        lineNumber: 123,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                                                lineNumber: 121,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-sm text-gray-500",
                                                        children: "Telefon"
                                                    }, void 0, false, {
                                                        fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                                                        lineNumber: 126,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-medium",
                                                        children: profile?.phone || 'Kiritilmagan'
                                                    }, void 0, false, {
                                                        fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                                                        lineNumber: 127,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                                                lineNumber: 125,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-sm text-gray-500",
                                                        children: "Manzil"
                                                    }, void 0, false, {
                                                        fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                                                        lineNumber: 130,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-medium",
                                                        children: profile?.address || 'Kiritilmagan'
                                                    }, void 0, false, {
                                                        fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                                                        lineNumber: 131,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                                                lineNumber: 129,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                                        lineNumber: 116,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pt-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            children: "Ma'lumotlarni tahrirlash"
                                        }, void 0, false, {
                                            fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                                            lineNumber: 136,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                                        lineNumber: 135,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                                lineNumber: 115,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                        lineNumber: 112,
                        columnNumber: 11
                    }, this),
                    activeTab === 'orders' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-semibold mb-6",
                                    children: "Buyurtmalarim"
                                }, void 0, false, {
                                    fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                                    lineNumber: 145,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                                lineNumber: 144,
                                columnNumber: 13
                            }, this),
                            orders.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white dark:bg-gray-800 rounded-2xl p-12 text-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-500",
                                    children: "Buyurtmalar topilmadi"
                                }, void 0, false, {
                                    fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                                    lineNumber: 150,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                                lineNumber: 149,
                                columnNumber: 15
                            }, this) : orders.map((order)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-500",
                                                            children: [
                                                                "Buyurtma #",
                                                                order.id.slice(0, 8)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                                                            lineNumber: 160,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-400",
                                                            children: new Date(order.created_at).toLocaleDateString('uz-UZ')
                                                        }, void 0, false, {
                                                            fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                                                            lineNumber: 163,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                                                    lineNumber: 159,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                    variant: getStatusVariant(order.status),
                                                    children: getStatusText(order.status)
                                                }, void 0, false, {
                                                    fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                                                    lineNumber: 167,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                                            lineNumber: 158,
                                            columnNumber: 19
                                        }, this),
                                        order.items && order.items.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "border-t pt-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: order.items.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between text-sm",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: [
                                                                        item.product_name || 'Mahsulot',
                                                                        " × ",
                                                                        item.quantity
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                                                                    lineNumber: 177,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatPrice"])(item.price * item.quantity)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                                                                    lineNumber: 180,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, idx, true, {
                                                            fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                                                            lineNumber: 176,
                                                            columnNumber: 27
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                                                    lineNumber: 174,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "border-t mt-4 pt-4 flex justify-between font-semibold",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Jami:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                                                            lineNumber: 185,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-primary-600",
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatPrice"])(order.total)
                                                        }, void 0, false, {
                                                            fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                                                            lineNumber: 186,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                                                    lineNumber: 184,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                                            lineNumber: 173,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, order.id, true, {
                                    fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                                    lineNumber: 154,
                                    columnNumber: 17
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                        lineNumber: 143,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/veluna-next/app/profile/ProfileContent.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=veluna-next_de43fda0._.js.map