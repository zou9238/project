PGDMP      %                {            product    16.0    16.0                 0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16406    product    DATABASE     �   CREATE DATABASE product WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Chinese (Traditional)_Taiwan.950';
    DROP DATABASE product;
                postgres    false            �            1259    16416 
   categories    TABLE     b   CREATE TABLE public.categories (
    id uuid NOT NULL,
    name character varying(20) NOT NULL
);
    DROP TABLE public.categories;
       public         heap    postgres    false            �            1259    16421 	   customers    TABLE     a   CREATE TABLE public.customers (
    id uuid NOT NULL,
    name character varying(20) NOT NULL
);
    DROP TABLE public.customers;
       public         heap    postgres    false            �            1259    16431    items    TABLE     �   CREATE TABLE public.items (
    id uuid NOT NULL,
    order_id uuid NOT NULL,
    product_id uuid NOT NULL,
    is_shipped character varying(20) NOT NULL
);
    DROP TABLE public.items;
       public         heap    postgres    false            �            1259    16436    orders    TABLE     �   CREATE TABLE public.orders (
    id uuid NOT NULL,
    customer_id uuid NOT NULL,
    is_paid character varying(20) NOT NULL
);
    DROP TABLE public.orders;
       public         heap    postgres    false            �            1259    16407    products    TABLE     �   CREATE TABLE public.products (
    id uuid NOT NULL,
    name character varying(100) NOT NULL,
    price character varying(20) NOT NULL,
    category_id uuid NOT NULL
);
    DROP TABLE public.products;
       public         heap    postgres    false            �          0    16416 
   categories 
   TABLE DATA           .   COPY public.categories (id, name) FROM stdin;
    public          postgres    false    216   �       �          0    16421 	   customers 
   TABLE DATA           -   COPY public.customers (id, name) FROM stdin;
    public          postgres    false    217          �          0    16431    items 
   TABLE DATA           E   COPY public.items (id, order_id, product_id, is_shipped) FROM stdin;
    public          postgres    false    218   �       �          0    16436    orders 
   TABLE DATA           :   COPY public.orders (id, customer_id, is_paid) FROM stdin;
    public          postgres    false    219   �       �          0    16407    products 
   TABLE DATA           @   COPY public.products (id, name, price, category_id) FROM stdin;
    public          postgres    false    215   �        c           2606    16420    categories category_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.categories DROP CONSTRAINT category_pkey;
       public            postgres    false    216            e           2606    16425    customers customer_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customer_pkey PRIMARY KEY (id);
 A   ALTER TABLE ONLY public.customers DROP CONSTRAINT customer_pkey;
       public            postgres    false    217            g           2606    16435    items item_pkey 
   CONSTRAINT     M   ALTER TABLE ONLY public.items
    ADD CONSTRAINT item_pkey PRIMARY KEY (id);
 9   ALTER TABLE ONLY public.items DROP CONSTRAINT item_pkey;
       public            postgres    false    218            i           2606    16442    orders order_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT order_pkey PRIMARY KEY (id);
 ;   ALTER TABLE ONLY public.orders DROP CONSTRAINT order_pkey;
       public            postgres    false    219            a           2606    16411    products product_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.products
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);
 ?   ALTER TABLE ONLY public.products DROP CONSTRAINT product_pkey;
       public            postgres    false    215            �   e  x�-��j\1F���"۲e�K7��#��!�@JBK ������I)�4�s�E]�N}�Α�!L���A}�b̈�z��͟�fw���lό����:�@�:?&���VJL�zw5?_.w����z�sy���nL�cAm�9���@lQP�z.��F��ߎ�Ύ���t������k�5B����A�B�>-n���'�ã�&U�:,=�^g��/7��q�w/\�a�@�
h����Z�^%N/O�y��������� �7@F
�B�<p\L~|!�Ԧ��߇�����h��jb�%�#��B9`PV�uZ�w����d�hZ�8�d;�-k"0vZvד�ysq��5o�c���      �   e  x��AnT1���]���I���N�{�@�B�H�	��Pg��i&�p2�e����琥��02���	�t�ɸi)~�wq���r|۹X�Ǫ��rg�����ʲ�잾�̈́�\c�\ Mtn��R �ΘcoY�2^ߎ�����a�ճ�;gVȅR�]��p�e?��7c�Xy�Wޯ��L��\bd�ƹ���8~��Ӟ�ǨV�St~e�S�Z7Ҙ�����>4�c��8�2�J󓉨����~���~�9�ȍ��l��9)D�Ҋ�T9�s�������U�ʦ	R�8k�:[T�\
��sSr}ܾ<l�~9��W�*�T�9T�@9�n).�����a��t/_8���c      �   ,	  x���;� ��㞻�����8�D��;8�	:�l`o���7k0�_#�dU��eW=9�PJ<��RÌ-��,�Q�v,O+1�(Z�;�5W������ڬ���3�|ձBoq�"�������.I���?��ׯ���_��#�VO�d57����PES91�V}|z+YWp���M�T�RO�����1���!��B���\��Ss�rfM��������N��w^��J2��˖JL�R�3w���B�IB����S��m��Mƭ�asK����q�-���9������2?m��U
�&AG�4����F�u�[��y�0�G�I��&R�x67Y�-b�R��ˌ�둖Z�.�Uj�->|�X��rr	�,2Z{��G\2�3���a����=v��Y�V��'͙'W�l9R�҂Y΁w���s~e<��=܃j'c^8��{����d�)c�1��7@p�;I�Q�x�M��kmk	n#�i�jo��ME����y(�<:'CR�i4Z����V�h�=��X����-I�o��=�meh)%ك�5�a=�f���#<�YuMÂ&��}Y �1��^��J�2hJ���Fb�g�d�ƝU^���$wpcb�/�Q%�TM�z}vO9�
(�Y>BM�PK�i^�\B��[(�a�+�:�eY�U�ڗ�V�M�P�0�m�bj'�r�E�<Z	9:=�S���öE 7�kv��%��Q8W���s���g%D��a=U��qE&}mm����ʙ]��)�@ �s=����>�-��@^?ǀsH�FxR,�x[n�;Ut$��sd-2����=NF{�����v�̭U�t��[j���(=.���'#9o?t��㖲/4�fJ�yg��$[��h��,��r��tE���f�C"2cOSY=m��9������ �C����`��Aג[j�8L�]Cf�����R��"��0FK�uʈ:�\���8�^'D�/T���I=~lk�茆<�UIGCbF�����7�
��=TK��
ݬ!]��K�ǌ7�����ii�97�Ke�T�1���i���$�L�$���qe����9�zUԖ�A ��~��
Mk���ҭ �����=W{ƬcV�����w`\�# [f�����햴yz�%���M����� 7��x&��)=Ϊ�LFC���?�sd�S���?�J�Z�7���l��/M`*(ug&z,���6���Z�Dj�Dɋ}
,W�KT	�S�C,�q����=�)��#F?��`Q��X�	(j�#�T�IG�1��lo�{WU��c�� ��ϙ��u����xlů<Fo���T]/�׾�ɓ��|�K=����Pv����� L{�a�m�T�/Z�{�DTI+��2e9KЮ]�+ӽ��8�t��i��P`��W��$Z�+:�� ršď_�"�������5W�r<a���C���	�'�9������A��ǥ`)H0�B����L��D�0Kס#.5@��Re	B�_��\~7�tQD~2� 3r�Z�?�[���Ǻc }j��Ǧ����%�}����$ʬw0�࿐c`8i��3��fY�Sq�Z=�s�\��w��#�]&M�99T�U.A; XC�XP�'z�)��X�����P�r��`���rm�3���w�i ʳ�=��ց���1c�ͮů�����ot���=ƪ��g�Z���*�u z}5=έMfT�X�X;.�*��8j�uD�؛'�R����i$�e�b�X� z�㴐�o��ɑt:�4bn<.�U�4Kl�]ꓹP�!{�^����>*vEQ�O�1��w��\#��l�<x���h���"��λ�Pj��W������S�])c�N�beC��C>$�/��{$�pb�We A����j�̏�@�\DV7���$��$�*~u�.�J��(�����N�\��I.��o �5}Y��M��Q�ŜR�����x�����5^�3�~f�-'Ж�ʴ�10�i�&�t�q���v-3�
�m��8g��V4�þ1����Ju��o����H`�y}=�uO<Wb�O?�ѫ�l�@����&����c�d{������≃ޕ�� E�C��Z��^��@��s�<*����O��*U�R9�۷/�ެ'���N ��|ئu�z�{[�p0
^���O��(�qJ��`���8��~{�ˏ����-�!%o���"y�x�f���EYR�F��8/x ʀ����0�0t�|���N���֝u�Zф�3^��R,�/����x�X�U۫�s��\���&*n��0��Aǝ��������I��A6������oX��i�~L�	-c�G\=���׿����7��2      �   �  x�M�=�7��y{�!��{qC�ҚRdA*7)x5�[Gx� ��`�������8f��s�vnHv�{D�hm|.�� ߕ@�	Nt�˃c�i��������Ͽ�T�ʆ�D�̂�r���'k����c�%jO�&����|������=�(V��8k�`\
�djk�t�-�如�C@�6�M�N�r{H�y�E����N!N[ˇ�IO�F��ot�u�ꄤ#dx�b��$ao▯>����F�M�=���i@VPO��W*��[N��Î�M����[���2�5UIY�q�c��glqDх����+w+��@�������+�r��,֐� 9變朠K�!�o�㦛.���:���&�k+�R~Po�֠����K�:���ݳ��p�;��3!̦D�ў��N�	�v�^M]�fz3On��������@��ܷ�E�P�&��z��^���ֻˑ�l�f�Ft���>�~����D��      �     x��Y�rG}���!'r_��7�%׷	��,![��$l#� lf�
x��P�U1'{ap؎(d� �Vue��%EMdTfO\t��R4q<ey��n������v�7�?�]������[�P�aEy'�#�ZN�υ�4Q:+c(���I6TJ*4��"���I��%]b�&6�ӗ�����/��'�����Z#�mJaERK��)�"V(F�ҥd�h1|Rr�"c׌%Od4�8���۬C*��f8�oݙ]�kq��_6B��rg�p����[���l��F�&�PF���.�P��)�Ќ�R�K"��~t<lm��5�I�:I\�{	�u�3�s�sQۉI�fc%�Ƣ6�`��=�jSr*N��E�ͯ��O����^�/�|:�@�Y�\jc(�Ag�d��@�).��&I��YB��D�H@SHN,��b�N6����δ�ޯ]_u 5��1��,j�TXIB:'�H�M(�I16�G�wm�RENu�*� jw�W}���[̅(D2�ߵ2��'���@�$X���h��8+���C2:�������+�t��M�l��iE-2@"�G\�HU��"��X�)"Ǻ� h Ч3�ri����ƃ��q�?,#Y�@\!�F�#f,�<%B gXT&B�DU�$
��$���YA�DL�fv6m�ot���U?�m�K1F%�s�3CB1���0� jbRDQ�'K�v؅��ʞdW�c�c}�=:Bû_�6�6�3�`X"
-���p�+��	ҧ	3�0��B9�����fB�1�`@��4l�7ovg����3�U� ��(`��u4����R�B˄�P(U�G�@��hb ���[X���v�G7х���vm���{~�l{�t.ZU���A#B@1�7��X���;���s�}�h5'/�C��&0K�6h�GA�S&�W�����,�U@٢)���#.Иb¨Ҵ�q���te8<C�*��5|l� �ڮx'k�� ��$hW�R�[vhq��՛��f��r�ƨq��8��.���(�/������]��W������!��\K��+5ǐp��\��@�t�l}����G�ۀ�i���3������(��v�f;w�nןw�׺��9�F�X8�9���4��,As,)�5�;GC�n]�� 3��Ơ �p8ƥpF6�o�.� @�2v��dV�$�F2�./ET����}Q����H �@P91�[������=��s@��۷#�(���7`0/1�= ����������φÃw���HR�,���ۀ���1�FEbc� ���C٤f�n�A: �o���,%H_4ub��n��Ί׉�P��������M�`���p#�"#�eaX8�� f=~F�����R�=�����0�[����۫ݫg�K�r]2� ���	i[�P���0�[���I���z�a���cͦ�KJ���-|&]+H�l�j�����͕	�%�����7��5��A(��ĳ -K�@vaCp�jL}]G�if��o@}w��:�O¨��8L�%���p*��"S���޲f����+�f�zlY�(23Xd^J��I�3�᠉�r���Oۛ����b��7<Y��ŸeT��BJc
`��i#�Jk����_����ɰq����?j��dPe5�o�B9x)��3	�y���	�h_�̎��WR�`��‚p,T<d
�Ы`?�ou_-�b��� e��	�U�gA�I�sf��U�m?��>����k��XP� R	��5�nf2`&T���ޯ��n{quxx0�=X�쨑H}��L@��H/�0L8&���p��~�����7ic�A��AVЪA���*��N�cQ'z�᧥�=����l�0;2�z2��L�%�+��(��)�c�+���sw����w��ً�5�#�"��3��;���H1<�D�FT�.����M9�h"�������s2�*Jli�f�Ŋ�i�o��01��G�ERd��y��R �dxv�{B[��p�j����2P����ٹ���GD$Py7����e���0=�����<mp�3���̗�\r� M)�e�P/�2L�n��0i��ઃ����v�}�>۟^"ƨ�)�Q$�!e�4
F�Q 9�<-�����3�O�.u0�>��H.�ڦ}p��o�N���T9��R�#k!��
;N��h���p\���mל{�SD� ��'0!�@���zOs9�Xx�ˍ���b �%��CE��W"��Z��|;\?M�0߮D&jx�JU��`#A��`������t��3�2M�'Epz5�A$J�W�*�M�z��.��"�|�%�B=	�'�H�0�V��e�
W￺�'˹X���G@���O�@�M,�����鞟��i��Ud����/���UT� -���U2d$'�o��v!��
�k5^�����B����k �RD0���x��jw��6~k߮u��}硡�i؈�d��8\0<T\b�L���y��?j��R�;�H,��rh��נ̘d��1#��c������4���A��J�!΃��CtL�4� Q�:m�.����?ܜ���&�\o�U"�ʀ���FP`K�}��\"���	�֍����δ�at��.� "3�(a��
�����`���k�Q�$�o�H�腐��Q0F1��A�^���������!=�VA3�T�Mk����RH7c�U�M;�gԱhΧ��52IG+V`706��ʄ5�1������v���v��Hu����S^�Pe1��鷾��alA���%��2`�A =����F����؆y ˿���#����{	꫗̎cvJ<*�P 5�s����c�-&�`t���%`��4�N�bKM����se���ph�=F<�݌���N�ܠH'?��VȌ�P��j���� �Fd��H
�+��G��*ꔜ��@���1�9���	���DYM�\&�/֑��kD��1bx��^��! �#*����_��L&�2'��     