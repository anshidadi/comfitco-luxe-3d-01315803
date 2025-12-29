import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Order } from '@/types';
import { toast } from 'sonner';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders from database
  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const mappedOrders: Order[] = (data || []).map(o => ({
        id: o.id,
        productId: o.product_id || '',
        productName: o.product_name,
        productImage: '', // We'll get this from product if needed
        productPrice: Number(o.total_price) / o.quantity,
        customerName: o.customer_name,
        mobileNumber: o.mobile,
        address: o.address,
        size: o.size,
        quantity: o.quantity,
        message: o.message || undefined,
        createdAt: new Date(o.created_at),
      }));

      setOrders(mappedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  // Create order
  const createOrder = async (order: {
    productId: string;
    productName: string;
    productPrice: number;
    customerName: string;
    mobileNumber: string;
    address: string;
    size: string;
    quantity: number;
    message?: string;
  }) => {
    try {
      const { error } = await supabase
        .from('orders')
        .insert({
          product_id: order.productId,
          product_name: order.productName,
          customer_name: order.customerName,
          mobile: order.mobileNumber,
          address: order.address,
          size: order.size,
          quantity: order.quantity,
          total_price: order.productPrice * order.quantity,
          message: order.message,
        });

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to place order');
      return false;
    }
  };

  // Set up realtime subscription
  useEffect(() => {
    fetchOrders();

    const channel = supabase
      .channel('orders-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        () => {
          fetchOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    orders,
    loading,
    createOrder,
    refetch: fetchOrders,
  };
};
